import { Router } from "express";
import { getIsFavorite, getPosts } from "../controllers/post.controller";

const router = Router();

router.get('/', getPosts);
router.get('/isFavorite/post/:postId/user/:userId', getIsFavorite);

export default router;