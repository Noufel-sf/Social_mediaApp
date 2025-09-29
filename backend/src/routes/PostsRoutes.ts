
import { Router, Request } from 'express';
import { isAuth2 } from '../middlewares/isAuth2';
// Make sure the path is correct
import upload from "../middlewares/multer"; 
const router = Router();


import { CreatePost ,GetUserPosts , GetAllPosts , DeletePost } from '../controllers/PostsController';

router.post('/create', isAuth2, upload.array("PostCovers", 4), CreatePost);
router.get('/all', GetAllPosts);
router.get("/:id", GetUserPosts);
router.delete("/:id", isAuth2, DeletePost);

export default router;

