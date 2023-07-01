import { Router } from "express";
import { createChat, getChatsForUser, sendMessage } from "../controllers/chat.controller";
import { existsPost, existsUser } from '../middlewares/validate-existance';
import validateJWT from "../middlewares/validate-jwt";
const router = Router();

router.post('/', [validateJWT], createChat);
router.get('/:userId', [validateJWT], getChatsForUser);
router.post('/send', [validateJWT], sendMessage);

export default router;