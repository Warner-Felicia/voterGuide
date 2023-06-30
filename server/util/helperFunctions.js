const contestCategories = require("../models/contest-category");

module.exports.groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

module.exports.assignGroupingData = async (response) => {
  try {
    const categories = await contestCategories.find();
    categories.forEach(category => {
      let isMatch = category.searchTerms.every(term => response.contest_name.includes(term));
      if (isMatch) {
        response.category = category.category;
        response.level = category.level;
        response.judicial = category.judicial;
      }
    })
    return response;
  } catch (error) {
    console.log(error);
  }
}
