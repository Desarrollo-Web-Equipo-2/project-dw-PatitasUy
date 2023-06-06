import { Router } from 'express';
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controllers/user.controller";
import { userExist } from '../middlewares/db_validator';

const router = Router();

router.get('/', getUsers);
router.post('/', postUser);
router.get('/:id', [userExist] ,getUser);
router.put('/:id', [userExist], putUser);
router.delete('/:id', [userExist], deleteUser);

export default router;