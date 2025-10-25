import { Router } from "express";
import { isAuth2 } from "../middlewares/isAuth2";
import {
  AcceptRequest,
  SendRequest,
  RejectRequest,
  ShowFriendRequests,
  getFriendSuggestions,
  getUserFriends,
} from "../controllers/requestController";
import { getRecommendedUsers } from "../controllers/userController";

const router = Router();

router.post("/send/:id", isAuth2, SendRequest);
router.get("/all", isAuth2, ShowFriendRequests);
router.get("/list", isAuth2, getUserFriends);
// router.get('/suggestions',  getFriendSuggestions);
router.get("/suggestions", isAuth2, getRecommendedUsers);

router.put("/accept/:id", isAuth2, AcceptRequest);
router.put("/reject/:id", isAuth2, RejectRequest);

export default router;
