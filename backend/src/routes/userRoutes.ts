import { Router } from 'express';
import { getFriends, getAllUsers, getRecommendedUsers, Login, Logout, me, Register } from '../controllers/userController';
import { loginValidator, registerValidator } from '../validations/userValidation';
import validateRequest from '../middlewares/validateRequest';
import { isAuth } from '../middlewares/isAuth';
import { refreshAccessToken } from './refreshTokenRoutes';

const router = Router();

router.post('/register',registerValidator, validateRequest, Register);
router.post('/login', loginValidator, validateRequest, Login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', Logout);


router.get('/me', isAuth, me);
router.get('/all', getAllUsers);
router.get('/recommended', isAuth, getRecommendedUsers);
router.get('/friends', isAuth, getFriends);


export default router;