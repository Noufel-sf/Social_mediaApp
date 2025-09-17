import { Router } from 'express';
import { isAuth } from '../middlewares/isAuth';
import { getMessages } from '../controllers/messageController';

const router = Router();

router.get('/:id', isAuth, getMessages);

export default router;