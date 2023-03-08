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