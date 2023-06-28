import { Router } from "express";
import { getPosts, getFavoritePosts, getIsFavorite } from "../controllers/post.controller";
const router = Router();

router.get('/', getPosts);
router.get('/user/:userId', getFavoritePosts);
router.get('/isFavorite/post/:postId/user/:userId', getIsFavorite);

export default router;