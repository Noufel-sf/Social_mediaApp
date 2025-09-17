import { Router } from 'express'
import { isAuth } from '../middlewares/isAuth';
import { AcceptRequest, SendRequest, RejectRequest, ShowFriendRequests } from '../controllers/requestController';

const router = Router();



router.post('/request/:id', isAuth, SendRequest);

router.get('/request/all', isAuth, ShowFriendRequests)

router.put('/request/:id/accept', isAuth, AcceptRequest);
router.put('/request/:id/reject', isAuth, RejectRequest);



export default router;