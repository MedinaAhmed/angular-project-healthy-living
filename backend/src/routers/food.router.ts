import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { Food, FoodModel } from "../models/food.model";
import { HTTP_BAD_REQUEST } from "../constans/http_status";
const router = Router();
router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
      res.send("Seed is already done");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("Seed is done");
  })
);
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);
router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);
router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  })
);
router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  })
);

router.post(
  "/profile",
  asyncHandler(async (req, res) => {
    const { name, price, tags, favorite, stars, imageUrl, origins, cookTime } =
      req.body;
    //check if the food is alredy excist
    const food = await FoodModel.findOne({ name });
    if (food) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Food is already exist, please try again!");
      return;
    }

    const newFood: Food = {
      id: "",
      name,
      price,
      tags,
      favorite,
      stars,
      imageUrl,
      origins,
      cookTime,
    };
    //save to database
    const dbFood = await FoodModel.create(newFood);
    res.send(dbFood);
    
  })
);
export default router;
