import { Router } from "express";
import { getPosts, getFavoritePosts, getIsFavorite, setFavorite } from "../controllers/post.controller";
import { existsPost, existsUser } from '../middlewares/validate-existance';
import validateJWT from "../middlewares/validate-jwt";
const router = Router();

router.get('/', [validateJWT], getPosts);
router.get('/user/:userId', [validateJWT], getFavoritePosts);
router.get('/isFavorite/post/:postId/user/:userId', [existsPost, existsUser, validateJWT], getIsFavorite);

router.put('/setFavorite/post/:postId/user/:userId', [existsPost, existsUser, validateJWT], setFavorite);

export default router;