import { Router } from 'express';
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controllers/user.controller";
import { emailNotExist, userExist } from '../middlewares/db_validator';
import { check } from 'express-validator';
import validateJWT from '../middlewares/validate-jwt';

const router = Router();

router.get('/', getUsers);
router.post('/', [emailNotExist], postUser);
router.get('/:id', [userExist], getUser);
router.put('/:id', [check('email', 'Email is required').isEmail(), emailNotExist], putUser);
router.delete('/:id', [validateJWT, userExist], deleteUser);

export default router;