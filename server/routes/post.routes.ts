import { Router } from "express";
import { getPosts, getFavoritePosts, getIsFavorite, setFavorite } from "../controllers/post.controller";
import { existsPost, existsUser } from '../middlewares/validate-existance';
const router = Router();

router.get('/', getPosts);
router.get('/user/:userId', getFavoritePosts);
router.get('/isFavorite/post/:postId/user/:userId', [existsPost, existsUser], getIsFavorite);

router.put('/setFavorite/post/:postId/user/:userId', [existsPost, existsUser], setFavorite);

export default router;