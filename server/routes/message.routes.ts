import { Router } from "express";
import { createChat, getChatsForUser, sendMessage } from "../controllers/chat.controller";
import { existsPost, existsUser } from '../middlewares/validate-existance';
import validateJWT from "../middlewares/validate-jwt";
import { getMessagesForChat } from "../controllers/message.controller";
const router = Router();

router.get('/:chatId', [validateJWT], getMessagesForChat);

export default router;