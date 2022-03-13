const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like.controllers');

// router.get('/user/:id', likeCtrl.getLikeFromUser);
router.get('/:id', likeCtrl.getLikeFromPost);
router.post('/:id', likeCtrl.like);
router.delete('/:id', likeCtrl.deleteLike);

module.exports = router;