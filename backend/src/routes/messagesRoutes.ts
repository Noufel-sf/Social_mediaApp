import { Router } from 'express';
import { isAuth2 } from '../middlewares/isAuth2';
import { getMessages } from '../controllers/messageController';

const router = Router();

router.get('/:id', isAuth2, getMessages);

export default router;