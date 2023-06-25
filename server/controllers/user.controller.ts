import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs from 'bcryptjs';

export const getUsers = async (req: Request, res: Response) => {

  try {
    const users = await User.findAll({
      where: {
        status: true
      }
    });
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    const { password, status, ...restUser } = user!.get();

    res.json(restUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
}

export const postUser = async (req: Request, res: Response) => {

  const { body } = req;

  try {
    const user = User.build(body);

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(body.password, salt);

    await user.save();

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);

    await user!.update(body);

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    await user!.update({ status: false });
  
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};
