import { Request, Response } from 'express';

export const getPosts = (req: Request, res: Response) => {
  res.json({
    msg: 'getPosts'
  });
}