import { Router } from "express";
import { getPosts, getFavoritePosts, getIsFavorite, getMyPosts, deletePost } from "../controllers/post.controller";
const router = Router();

router.get('/', getPosts);
router.get('/favorites/user/:userId', getFavoritePosts);
router.get('/isFavorite/post/:postId/user/:userId', getIsFavorite);
router.get('/user/:userId', getMyPosts);
router.put('/deletePost/post/:postId/user/:userId', deletePost)
export default router;