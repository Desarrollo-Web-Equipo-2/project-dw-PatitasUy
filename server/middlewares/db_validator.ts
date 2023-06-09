import { Request, Response, NextFunction } from 'express';
import User from "../models/user";

export const userExist = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const existUser = await User.findOne({
    where: {
      status: true,
      user_id: id
    }
  });

  if (!existUser) {
    return res.status(404).json({
      msg: 'User not found'
    });
  }

  next();
};

export const emailNotExist = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const { id } = req.params;

  const existEmail = await User.findOne({
    where: {
      status: true,
      email: email
    }
  });


  if (existEmail && existEmail.user_id != Number(id)) {
    return res.status(409).json({
      msg: 'Email already exists'
    });
  }

  next();
};