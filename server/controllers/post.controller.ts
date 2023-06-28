import express, { Express, Request, Response } from 'express';
import Posts from "../models/post";
import Likes from "../models/likes";
import User from "../models/user";
import { ErrorCodes } from "../helpers/error-codes";
import { Post } from '../interfaces/post.interface';

import db from '../db/config';

export const getPosts = (req: Request, res: Response) => {
  res.json({
    msg: 'getPosts'
  });
}

export const getIsFavorite = async (req: Request, res: Response) => {
  const { postId, userId } = req.params;

  const post = await Posts.findByPk(postId);
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
  const posts: Post[] = result[0] as Post[];

  posts.forEach((post: Post) => {
    if (typeof post.url === 'string') {
      post.url = post.url.split(",") as string[];
    }
  });
  res.json(posts);
};
