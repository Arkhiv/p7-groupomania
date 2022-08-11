const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment.controller');

// Comment CRUD

router.get('/', auth, commentCtrl.readAllComments);
router.get('/:id', auth, commentCtrl.readComment);
router.post('/', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
