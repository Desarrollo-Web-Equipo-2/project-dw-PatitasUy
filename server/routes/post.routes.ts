import { Router } from "express";
import { getPosts, getFavoritePosts, getIsFavorite } from "../controllers/post.controller";
import validateJWT from "../middlewares/validate-jwt";
const router = Router();

router.get('/', [validateJWT], getPosts);
router.get('/user/:userId', [validateJWT], getFavoritePosts);
router.get('/isFavorite/post/:postId/user/:userId',[validateJWT], getIsFavorite);

export default router;