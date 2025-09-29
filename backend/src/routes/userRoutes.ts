import { Router } from 'express';
import { getFriends, getAllUsers, getRecommendedUsers, Login, Logout, FetchCurrentUser, Register } from '../controllers/userController';
import { loginValidator, registerValidator } from '../validations/userValidation';
import validateRequest from '../middlewares/validateRequest';
import { isAuth2 } from '../middlewares/isAuth2';
import { refreshAccessToken } from './refreshTokenRoutes';

const router = Router();

router.post('/register',registerValidator, validateRequest, Register);
router.post('/login', loginValidator, validateRequest, Login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', Logout);

router.get('/currentuser', isAuth2, FetchCurrentUser);
router.get('/all', getAllUsers);
router.get('/recommended', isAuth2, getRecommendedUsers);
router.get('/friends', isAuth2, getFriends);



export default router;