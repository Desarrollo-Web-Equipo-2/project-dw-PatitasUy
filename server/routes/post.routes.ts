import { Router } from "express";
import { getPosts, getPostsByUser } from "../controllers/post.controller";
const router = Router();

router.get('/', getPosts);
router.get('/user/:userId', getPostsByUser);



export default router;