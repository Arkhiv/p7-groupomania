const express = require('express');
const multer = require('multer');

const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post.controller');

const upload = multer();

// Post CRUD

router.get('/', auth, postCtrl.readAllPosts);
router.get('/:id', auth, postCtrl.readPost);
router.post('/', auth, upload.single('picture'), postCtrl.createPost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

router.put('/:id/like', auth, postCtrl.likePost);

module.exports = router;
