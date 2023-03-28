const express = require('express');

const County = require('../models/county');
const countyController = require('../controllers/counties');

const router = express.Router();

router.get('/', countyController.getCounties);

router.put('/toggleFavorite', countyController.toggleFavorite)

module.exports = router;
