import { Router } from 'express';
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controllers/user.controller";
import { emailExist, userExist } from '../middlewares/db_validator';
import validateJWT from '../middlewares/validate-jwt';

const router = Router();

router.get('/', getUsers);
router.post('/', [emailExist], postUser);
router.get('/:id', [userExist], getUser);
router.put('/:id', [validateJWT, userExist], putUser);
router.delete('/:id', [validateJWT, userExist], deleteUser);

export default router;