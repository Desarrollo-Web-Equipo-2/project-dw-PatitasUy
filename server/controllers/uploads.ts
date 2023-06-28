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
    let imagesUrls: string[] = [];
    const fileList = req.files!?.file as any;

    if (fileList) {
      for (const file of fileList?.length > 0 ? fileList : [fileList]) {
        const { tempFilePath } = file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        imagesUrls.push(secure_url);
      }
    }

    model.img = imagesUrls.join(',');
    await model.save();

    return res.json({ urls: imagesUrls, joinedUrls: model.img });
  } catch (error) {
    return res.status(500).json({ msg: 'Contact the administrator' });
  }
}




