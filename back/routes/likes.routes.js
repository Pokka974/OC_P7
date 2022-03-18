const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/likes.controllers');
const auth = require('../middlewares/auth');

// router.get('/user/:id', likeCtrl.getLikeFromUser);
router.get('/:id', auth, likeCtrl.getLikeFromPost);
router.get('/user/:id', auth, likeCtrl.getLikeFromUserAndPost);
router.post('/:id', auth, likeCtrl.like);
router.delete('/:id', auth, likeCtrl.deleteLike);

module.exports = router;