import { Router } from "express";
import { getPosts, getFavoritePosts } from "../controllers/post.controller";
const router = Router();

router.get('/', getPosts);
router.get('/user/:userId', getFavoritePosts);



export default router;