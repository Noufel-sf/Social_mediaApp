
import { Router, Request } from 'express';
import { isAuth2 } from '../middlewares/isAuth2';
import upload from "../middlewares/multer"; 
import { CreatePost  , GetAllUserPosts , DeletePost, ToggleLike } from '../controllers/PostsController';



const router = Router();


router.get('/all', isAuth2, GetAllUserPosts);


router.post('/create', isAuth2, upload.array("PostCovers", 4), CreatePost);
router.put('/like/:id', isAuth2, ToggleLike);


router.delete("/delete/:id", isAuth2, DeletePost);

export default router;

