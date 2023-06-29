import { Request, Response } from 'express';
import Likes from "../models/likes";
import { Post } from '../interfaces/post.interface';

import db from '../db/config';
import { ErrorCodes } from '../helpers/error-codes';

export const getPosts = (req: Request, res: Response) => {
    res.json({
        msg: 'getPosts'
    });
}

export const getFavoritePosts = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const result = await db.query('SELECT * FROM Posts');
    const posts: Post[] = result[0] as Post[];

    posts.forEach((post: Post) => {
        if (typeof post.url === 'string') {
            post.url = post.url.split(",") as string[];
        }
    });
    res.json(posts);
};

export const getIsFavorite = async (req: Request, res: Response) => {
    const { postId, userId } = req.params;

    try {
        const like = await Likes.findOne({
            where: {
                post_id: postId,
                user_id: userId
            }
        });

        res.json(!!like);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ErrorCodes.INTERNAL_SERVER_ERROR });
    }
}

export const setFavorite = async (req: Request, res: Response) => {
    const { postId, userId } = req.params;
    const isSet = req.body.favorite;

    try {
        const like = await Likes.findOne({
            where: {
                post_id: postId,
                user_id: userId
            }
        });

        if (like) {
            if (!isSet) {
                await like.destroy();
                res.status(200).json(false);
                return;
            }
            res.status(304).json(true);
        } else {
            if (isSet) {
                await Likes.create({
                    post_id: postId,
                    user_id: userId
                });
                res.status(200).json(true);
                return;
            }
            res.status(304).json(false);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ErrorCodes.INTERNAL_SERVER_ERROR });
    }
}
