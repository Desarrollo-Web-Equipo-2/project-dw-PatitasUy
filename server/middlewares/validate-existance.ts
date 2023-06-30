import { NextFunction, Request, Response } from "express";
import Posts from '../models/post';
import { ErrorCodes } from '../helpers/error-codes';
import User from '../models/user';

export const existsPost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    const post = await Posts.findByPk(postId);
    if (!post) {
        res.status(404).send({ msg: ErrorCodes.POST_NOT_FOUND });
        return;
    }

    next();
};

export const existsUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
        res.status(404).send({ msg: ErrorCodes.USER_NOT_FOUND });
        return;
    }

    next();
};