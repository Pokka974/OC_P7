const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', postCtrl.addPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;