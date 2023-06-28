import express, { Express, Request, Response } from 'express';
import db from '../db/config';
import { Post } from '../interfaces/post.interface';
const app: Express = express();
const port = 3000;

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
