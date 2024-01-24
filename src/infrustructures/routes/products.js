const express = require('express');
const router = express.Router();
const productsController = require('../../app/controllers/ProductController');
const { validateSetScore } = require('../validators/SetScoreValidator');

router.get('/', productsController.index);
router.get('/:id', productsController.show);
router.post('/', productsController.create);
router.post('/scoring/:id', validateSetScore, productsController.setScore);

module.exports = router;
