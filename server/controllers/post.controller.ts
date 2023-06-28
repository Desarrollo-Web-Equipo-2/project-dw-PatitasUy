import { Request, Response } from 'express';
import Post from "../models/post";
import Likes from "../models/likes";
import User from "../models/user";
import { ErrorCodes } from "../helpers/error-codes";

export const getPosts = (req: Request, res: Response) => {
    res.json({
        msg: 'getPosts'
    });
}

/**
 * Gets whether a given post has been liked by a given user
 */
export const getIsFavorite = async (req: Request, res: Response) => {
    const {postId, userId} = req.params;

    const post = await Post.findByPk(postId);
    if (!post) {
        res.status(404).send({error: ErrorCodes.POST_NOT_FOUND});
        return;
    }

    const user = await User.findByPk(userId);
    if (!user) {
        res.status(404).send({error: ErrorCodes.USER_NOT_FOUND});
        return;
    }

    const like = await Likes.findOne({
        where: {
            post_id: postId,
            user_id: userId
        }
    });

    res.json(!!like);
}