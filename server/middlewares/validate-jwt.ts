import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";

const validateJWT = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      msg: 'No token provided'
    });
  }
  
  try {
    const { uid }: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '');
    //Read user that match with uid
    const user = await User.findByPk(uid);

    if(!user){
      return res.status(401).json({
        msg: 'Invalid token - user not exist'
      });
    }

    if(!user.status){
      return res.status(401).json({
        msg: 'Invalid token - user status: false'
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      msg: 'Invalid token'
    });
  }
};

export default validateJWT;