const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like.controllers');

router.get('/user/:id', likeCtrl.getLikeFromUser);
router.get('/post/:id', likeCtrl.getLikeFromPost);
router.post('/', likeCtrl.like);
router.delete('/:id', likeCtrl.deleteLike);

module.exports = router;