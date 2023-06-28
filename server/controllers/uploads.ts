import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/post';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config(process.env.CLOUDINARY_URL!);

export const upadateImageCloudinary = async (req: Request, res: Response) => {
  const { table, id } = req.params;

  if (!table || !id) {
    return res.status(400).json({ msg: 'Invalid table or id' });
  }

  let model: any = {};

  switch (table) {
    case 'users':
      model = await User.findByPk(id);
      if (!model) {
        return res.status(400).json({ msg: `There is no user with the id ${id}` });
      }

      break;

    case 'posts':
      model = await Post.findByPk(id);
      if (!model) {
        return res.status(400).json({ msg: `There is no post with the id ${id}` });
      }

      break;

    default:
      return res.status(500).json({ msg: 'I forgot to validate this' });
  }

  try {

    const { tempFilePath } = req.files!.file as any;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.url = secure_url;

    await model.save();

  } catch (error) {
    return res.status(500).json({ msg: 'Contact the administrator' });
  }

  return res.json({ url: model.url });
}




