
import { Router, Request } from 'express';
import { isAuth2 } from '../middlewares/isAuth2';
// Make sure the path is correct
import upload from "../middlewares/multer"; 
const router = Router();


import { CreatePost  , GetAllUserPosts , DeletePost } from '../controllers/PostsController';

router.get('/all', GetAllUserPosts);
router.post('/create', isAuth2, upload.array("PostCovers", 4), CreatePost);
router.delete("/delete/:id", isAuth2, DeletePost);

export default router;

