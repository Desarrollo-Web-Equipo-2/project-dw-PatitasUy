import express, { Express, Request, Response } from 'express';
import Posts from "../models/post";
import Likes from "../models/likes";
import User from "../models/user";
import { ErrorCodes } from "../helpers/error-codes";
import { Post } from '../interfaces/post.interface';
import db from '../db/config';

const app: Express = express();
const port = 3000;

export const getPosts = async (req: Request, res: Response) => {
  /*
  const result = await db.query(`SELECT * FROM Posts`);
  const posts: Post[] = result[0] as Post[];
  res.json(posts);
*/
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

//TODO error si no encuentra nada
export const getFavoritePosts = async (req: Request, res: Response) => {
  const { userId } = (req.params);
  try {
    const favoritePosts = await db.query(`SELECT * FROM Posts p JOIN Likes l ON l.post_id = p.post_id WHERE l.user_id = ${userId}`)
    const posts: Post[] = favoritePosts[0] as Post[];

    posts.forEach((post: Post) => {
      if (typeof post.url === 'string') {
        post.url = post.url.split(",") as string[];
      }
    });
    res.json(posts);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
}


//TODO error si no encuentra nada
export const getMyPosts = async (req: Request, res: Response) => {
  const { userId } = (req.params);

  try {
    const result = await db.query(`SELECT * FROM Posts WHERE user_id = ${userId}`);
    const posts: Post[] = result[0] as Post[];
    posts.forEach((post: Post) => {
      if (typeof post.url === 'string') {
        post.url = post.url.split(",") as string[];
      }
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};