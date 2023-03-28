const County = require('../models/county');

module.exports.getCounties = async (req, res, next) => {
  try {
    const counties = await County.find().sort({ countyName: 1 });
    res.status(200).json({
      message: "Successfully fetched counties",
      counties: counties
    })
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch counties',
      error: error
    })
  }
}

module.exports.toggleFavorite = async (req, res, next) => {
  try {
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
}