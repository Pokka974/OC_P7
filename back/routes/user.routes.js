const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
const passwordValidator = require('../middlewares/password_validator');
const auth = require('../middlewares/auth');

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id',  auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;