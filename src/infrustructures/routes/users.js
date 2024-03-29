const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/UserController');

router.get('/:id', userController.show);
router.post('/', userController.create);

module.exports = router;
