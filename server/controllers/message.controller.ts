import { Request, Response } from 'express';
import db from '../db/config';

export const getMessagesForChat = async (req: Request, res: Response) => {
    try {
        const chatId = Number(req.params.chatId);

        // FIXME: Don't use raw queries for this
        const data = await db.query(`
            SELECT * FROM Messages, Users 
            WHERE chat_id = ${chatId} AND user_id = sender_id
            ORDER BY message_id ASC
        `);

        res.json(data[0].map((values: any) => ({
            message_id: values.message_id,
            chat_id: values.chat_id,
            content: values.content,
            sender: {
                user_id: values.user_id,
                name: values.name,
                surname: values.surname,
                email: values.email,
                url: values.url,
            },
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server error',
        });
    }
}
