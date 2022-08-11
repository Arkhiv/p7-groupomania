const express = require('express');

const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user.controller');
const uploadMiddleware = require('../middleware/multer');

const upload = multer();

// Auth
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// User CRUD

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

// upload
router.post('/upload', upload.single('file'), uploadMiddleware.uploadProfil);

module.exports = router;
