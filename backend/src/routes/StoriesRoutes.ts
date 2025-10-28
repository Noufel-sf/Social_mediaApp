
import { Router, Request } from 'express';
import { isAuth2 } from '../middlewares/isAuth2';
import upload from "../middlewares/multer"; 
const router = Router();


import { CreateStory  , GetAllUserStories , DeleteStory } from '../controllers/StoriesController';

router.get('/all', isAuth2, GetAllUserStories);
router.post('/create', isAuth2, upload.single("storyFile"), CreateStory);
router.delete("/delete/:id", isAuth2, DeleteStory);


export default router;