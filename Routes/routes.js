import {signup,login,createAdmin,getAdminStats,getAllMemes,populateMemes} from '../Controller/controller.js';
import express from 'express';
const router = express.Router();
router.post('/signup',signup);
router.post('/login',login);
router.post('/create-admin',createAdmin);
router.get('/admin-stats',getAdminStats);
router.get('/memes',getAllMemes);
router.post('/populate-memes',populateMemes);
router.get('/test-memes', (req, res) => {
  console.log('Test memes endpoint hit')
  res.json([{
    _id: '1',
    title: 'Test Meme',
    imageUrl: 'https://i.imgflip.com/1bij.jpg',
    topText: 'Test Top',
    bottomText: 'Test Bottom',
    category: 'Test',
    likes: 5
  }])
});
export default router;