import { Request, Response } from 'express';
import Likes from "../models/likes";
import { ErrorCodes } from "../helpers/error-codes";
import db from '../db/config';
import Post from '../models/post';
import { PostDto } from '../interfaces/post.interface';

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
    res.status(500).json({ msg: ErrorCodes.INTERNAL_SERVER_ERROR });
  }
}

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
    res.status(500).json({ msg: ErrorCodes.INTERNAL_SERVER_ERROR });
  }
}

//TODO error si no encuentra nada
export const getFavoritePosts = async (req: Request, res: Response) => {
  const { userId } = (req.params);
  try {
    const favoritePosts = await db.query(`SELECT * FROM Posts p JOIN Likes l ON l.post_id = p.post_id WHERE l.user_id = ${userId}`,)
    const posts: PostDto[] = favoritePosts[0] as PostDto[];

    posts.forEach((post: PostDto) => {
      if (typeof post.url === 'string') {
        post.url = post.url.split(",") as string[];
      }
    });
    res.json(posts);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: ErrorCodes.INTERNAL_SERVER_ERROR });
  }
}

//TODO error si no encuentra nada
export const getMyPosts = async (req: Request, res: Response) => {
  const { userId } = (req.params);

  try {
    const result = await db.query(`SELECT * FROM Posts WHERE user_id = ${userId}`);
    const posts: PostDto[] = result[0] as PostDto[];
    posts.forEach((post: PostDto) => {
      if (typeof post.url === 'string') {
        post.url = post.url.split(",") as string[];
      }
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: ErrorCodes.INTERNAL_SERVER_ERROR });
  }
};



