const express = require('express');

const County = require('../models/county');
const countyController = require('../controllers/counties');

const router = express.Router();

router.get('/', countyController.getCounties);

router.put('/toggleFavorite', async(req, res, next) => {
  try{
    let county = await County.findOne({ countyName: req.body.countyName });
    county.favorite = (county.favorite === true) ? false : true;
    const updatedCounty = await county.save();
    res.status(200).json({
      message: 'Favorite status updated',
      updatedCounty: updatedCounty
    })

  } catch (error) {
    res.status(500).json({
      message: 'Unable to update favorite status',
      error: error
    })
  }
})

module.exports = router;

