require("dotenv").config();
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_CREDS;
const Department = require("./models/Department");
const Category = require("./models/Category");
// const Product = require("../models/Product");

const connect = async () => {
  try {
    await mongoose.connect(mongoDB);
  } catch (err) {
    console.error(err);
  }
};

const generateDepartments = ({
  insertedMeatCategories,
  insertedSeafoodCategories,
  insertedProduceCategories,
  insertedDairyCategories,
  insertedBakedCategories,
  insertedOfficeCategories,
  insertedCleaningCategories,
  insertedDryGoodsCategories,
}) => {
  return [
    {
      title: "Meat",
      photo: "https://photos-for-meet-market.s3.amazonaws.com/meat-section.jpg",
      categories: insertedMeatCategories.map((cat) => cat._id),
    },
    {
      title: "Seafood",
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/seafood-section.jpg",
      categories: insertedSeafoodCategories.map((cat) => cat._id),
    },
    {
      title: "Produce",
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/produce-section.jpeg",
      categories: insertedProduceCategories.map((cat) => cat._id),
    },
    {
      title: "Dairy",
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/dairy-section.jpeg",
      categories: insertedDairyCategories.map((cat) => cat._id),
    },
    {
      title: "Baked Goods",
      photo: "https://photos-for-meet-market.s3.amazonaws.com/bakery.jpeg",
      categories: insertedBakedCategories.map((cat) => cat._id),
    },
    // { title: "Beverages" },
    {
      title: "Office Supplies",
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/office-supplies.jpeg",
      categories: insertedOfficeCategories.map((cat) => cat._id),
    },
    // { title: "Prepared Meals" },
    // { title: "Paper Products" },
    {
      title: "Cleaning Supplies",
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/cleaning-supplies.jpg",
      categories: insertedCleaningCategories.map((cat) => cat._id),
    },
    // { title: "Frozen" },
    {
      title: "Dry Goods",
      photo: "https://photos-for-meet-market.s3.amazonaws.com/dry-goods.jpeg",
      categories: insertedDryGoodsCategories.map((cat) => cat._id),
    },
    // { title: "Bread" },
    // { title: "Snacks" },
    // { title: "Vitamins" },
    // { title: "Hygiene" },
    // { title: "Other" },
  ];
};

const meatCats = [
  {
    title: "Chicken",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/Chicken.jpeg",
  },
  {
    title: "Beef",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/beef.jpeg",
  },
  {
    title: "Pork",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/pork.jpg",
  },
];
const seafoodCats = [
  {
    title: "Fish",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/fish.jpeg",
  },
  {
    title: "Shellfish",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/shellfish.jpeg",
  },
];
const produceCats = [
  {
    title: "Fruits",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/fruit.jpeg",
  },
  {
    title: "Vegetables",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/vegetables.jpg",
  },
  {
    title: "Prepared",
    photo:
      "https://photos-for-meet-market.s3.amazonaws.com/preparedVeggies.jpeg",
  },
];
const dairyCats = [
  {
    title: "Milk",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/milk.jpeg",
  },
  {
    title: "Cheese",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/cheese.jpeg",
  },
  {
    title: "Eggs",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/eggs.jpeg",
  },
];
const bakedCats = [
  {
    title: "Muffins & Bagels",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/bagels.jpg",
  },
  {
    title: "Cookies",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/cookies.jpeg",
  },
  {
    title: "Cakes",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/cakes.jpeg",
  },
];
const officeCats = [
  {
    title: "Paper",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/paper.jpeg",
  },
  {
    title: "Filing & Storage",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/filing.jpg",
  },
  {
    title: "Breakroom",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/breakroom.jpg",
  },
];
const cleaningCats = [
  {
    title: "Laundry",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/laundry.jpeg",
  },
  {
    title: "Cleaners",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/cleaners.jpeg",
  },
  {
    title: "Tools",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/tools.jpeg",
  },
  {
    title: "Dish Soap & Detergent",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/dish.jpg",
  },
  {
    title: "Trash Bags",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/trashbags.jpeg",
  },
];
const dryGoodsCats = [
  {
    title: "Baking Supplies",
    photo:
      "https://photos-for-meet-market.s3.amazonaws.com/baking-supplies.jpeg",
  },
  {
    title: "Sweeteners",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/sweeteners.jpeg",
  },
  {
    title: "Spices",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/spices.jpeg",
  },
  {
    title: "Soup & Broth",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/broth.jpeg",
  },
  {
    title: "Sauces & Condiments",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/condiments.jpeg",
  },
  {
    title: "Canned Goods",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/canned-foods.jpeg",
  },
  {
    title: "Pasta & Grains",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/grains.jpeg",
  },
  {
    title: "Vinegar & Oil",
    photo:
      "https://photos-for-meet-market.s3.amazonaws.com/oil+%26+vinegar.jpeg",
  },
  {
    title: "Nut Butters & Jams",
    photo: "https://photos-for-meet-market.s3.amazonaws.com/nut+butters.jpeg",
  },
];

const dropCollections = async () => {
  await Department.collection.drop();
  await Category.collection.drop();
};

const insertData = async () => {
  try {
    const insertedMeatCategories = await Category.insertMany(meatCats);
    const insertedSeafoodCategories = await Category.insertMany(seafoodCats);
    const insertedProduceCategories = await Category.insertMany(produceCats);
    const insertedDairyCategories = await Category.insertMany(dairyCats);
    const insertedBakedCategories = await Category.insertMany(bakedCats);
    const insertedOfficeCategories = await Category.insertMany(officeCats);
    const insertedCleaningCategories = await Category.insertMany(cleaningCats);
    const insertedDryGoodsCategories = await Category.insertMany(dryGoodsCats);
    const departmentData = generateDepartments({
      insertedMeatCategories,
      insertedSeafoodCategories,
      insertedProduceCategories,
      insertedDairyCategories,
      insertedBakedCategories,
      insertedOfficeCategories,
      insertedCleaningCategories,
      insertedDryGoodsCategories,
    });
    const insertedDepartments = await Department.insertMany(departmentData);
  } catch (err) {
    console.error(err);
  }
};

const seed = async () => {
  await connect();
  await dropCollections();
  await insertData();
  process.exit();
};

seed();
