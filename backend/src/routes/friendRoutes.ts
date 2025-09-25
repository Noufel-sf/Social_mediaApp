import { Router } from 'express'
import { isAuth2 } from '../middlewares/isAuth2';
import { AcceptRequest, SendRequest, RejectRequest, ShowFriendRequests } from '../controllers/requestController';

const router = Router();



router.post('/request/:id', isAuth2, SendRequest);

router.get('/request/all', isAuth2, ShowFriendRequests)

router.put('/request/:id/accept', isAuth2, AcceptRequest);
router.put('/request/:id/reject', isAuth2, RejectRequest);



export default router;