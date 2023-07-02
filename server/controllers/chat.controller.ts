import { Request, Response } from 'express';
import Chats from '../models/chats';
import Messages from '../models/messages';
import db from '../db/config';
import { Op } from 'sequelize';

export const getChatsForUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);

        // FIXME: Don't use raw queries for this
        const data = await db.query(`
            SELECT * FROM Chats, Users 
            WHERE user_id_1 = ${userId} AND user_id_2 = user_id
            UNION
            SELECT * FROM Chats, Users 
            WHERE user_id_2 = ${userId} AND user_id_1 = user_id
        `);

        res.json(data[0].map((values: any) => ({
            chat_id: values.chat_id,
            to: {
                user_id: values.user_id,
                name: values.name,
                surname: values.surname,
                email: values.email,
                url: values.url,
            }
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error',
        });
    }
}

export const createChat = async (req: Request, res: Response) => {
    try {
        const { user_id_1, user_id_2 } = req.body;

        const existingChats = await Chats.findAll({
            where: {
                [Op.or]: [
                    { user_id_1: user_id_1, user_id_2: user_id_2 },
                    { user_id_1: user_id_2, user_id_2: user_id_1 },
                ],
            }
        });

        if (existingChats.length > 0) {
            res.json(existingChats[0]);
        } else {
            const chat = await Chats.create({
                user_id_1,
                user_id_2,
            });

            res.json(chat);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error',
        });
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { chat_id, sender_id, content } = req.body;

        const message = await Messages.create({
            chat_id,
            sender_id,
            content,
        });

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error',
        });
    }
}
