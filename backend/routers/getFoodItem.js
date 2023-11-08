const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
router.post("/getFoodItem", async (req, res) => {
  try {
    const responseData = {};
    const fetchedCategory = await mongoose.connection.db.collection(
      "food-category"
    );
    const fetchedFoodData = await mongoose.connection.db.collection(
      "food-data"
    );
    const foodCat = await fetchedCategory.find().toArray();
    const foodData = await fetchedFoodData.find().toArray();
    responseData.foodCategory = foodCat;
    responseData.foodData = foodData;
    res.send(responseData);
  } catch (eror) {
    console.log(eror);
  }
});
module.exports = router;
