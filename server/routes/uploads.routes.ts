import { Router } from 'express';
import { upadateImageCloudinary } from '../controllers/uploads';

const router = Router();

router.put('/:table/:id', upadateImageCloudinary)

export default router;