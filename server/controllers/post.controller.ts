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
    const favoritePosts = await db.query(`SELECT * FROM Posts p JOIN Likes l ON l.post_id = p.post_id WHERE l.user_id = ${userId}`)
    const posts: PostDto[] = favoritePosts[0] as PostDto[];
    res.json(posts);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: ErrorCodes.INTERNAL_SERVER_ERROR });
  }
}

export const getMyPosts = async (req: Request, res: Response) => {
  const { userId } = (req.params);
  try {
    const posts = await Post.findAll({
      where: {
        user_id: userId
      }
    });
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: ErrorCodes.INTERNAL_SERVER_ERROR });
  }
};
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
    res.status(500).json({ msg: ErrorCodes.INTERNAL_SERVER_ERROR });
  }

}
export const postPost = async (req: Request, res: Response) => {

  const { body } = req;

  try {
    const post = Post.build(body);

    await post.save();

    res.json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const post = await Post.findOne({
      where: {
        post_id: postId,
      }
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};


