import express, { Express, Request, Response } from 'express';
import Likes from "../models/likes";
import User from "../models/user";
import { ErrorCodes } from "../helpers/error-codes";
import Post from '../models/post';



import db from '../db/config';
import { IPost } from '../interfaces/post.interface';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      where: {
        state: "Activo"
      }
    });
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
}

export const getIsFavorite = async (req: Request, res: Response) => {
  const { postId, userId } = req.params;

  const post = await Post.findByPk(postId);
  if (!post) {
    res.status(404).send({ error: ErrorCodes.POST_NOT_FOUND });
    return;
  }

  const user = await User.findByPk(userId);
  if (!user) {
    res.status(404).send({ error: ErrorCodes.USER_NOT_FOUND });
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


export const getFavoritePosts = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await db.query('SELECT * FROM Posts');
  const posts: IPost[] = result[0] as IPost[];

  posts.forEach((post: IPost) => {
    if (typeof post.url === 'string') {
      post.url = post.url.split(",") as string[];
    }
  });
  res.json(posts);
};
