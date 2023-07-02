import { Router } from "express";
import { getPosts, getFavoritePosts, getIsFavorite, setFavorite, postPost, getPost } from "../controllers/post.controller";
import { existsPost, existsUser } from '../middlewares/validate-existance';
import validateJWT from "../middlewares/validate-jwt";
const router = Router();

router.get('/', [validateJWT], getPosts);
router.get('/details/:postId', [validateJWT,existsPost], getPost);
router.get('/user/:userId', [validateJWT], getFavoritePosts);
router.get('/isFavorite/post/:postId/user/:userId', [existsPost, existsUser, validateJWT], getIsFavorite);
router.put('/setFavorite/post/:postId/user/:userId', [existsPost, existsUser, validateJWT], setFavorite);
router.post('/', [validateJWT], postPost);

export default router;
