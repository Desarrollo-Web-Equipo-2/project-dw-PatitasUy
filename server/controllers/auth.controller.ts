import { Response, Request } from "express";
import User from "../models/user";
import bcryptjs from 'bcryptjs';
import generateJWT from '../helpers/generate-jwt';
import jwt from 'jsonwebtoken';
import { ErrorCodes } from '../helpers/error-codes';

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(401).json({
                msg: 'User / Password are not correct - email'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'User / Password are not correct - status: false'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: 'User / Password are not correct - password'
            });
        }

        //jwt
        const token = await generateJWT(user.user_id.toString());

        res.json({
            user,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error',
        });
    }
};

export const isValidToken = async (req: Request, res: Response) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No token provided'
        });
    }

    try {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY || '');

        res.status(200).send(true);

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: ErrorCodes.INVALID_TOKEN
        });
    }
};