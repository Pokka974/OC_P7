const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');
const auth = require('../middlewares/auth');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, postCtrl.addPost);
router.post('/:id', auth, postCtrl.addResponse);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/comments/:id', auth, postCtrl.getComments);

module.exports = router;