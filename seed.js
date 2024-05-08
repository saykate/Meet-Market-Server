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

const generateDepartments = ({ insertedMeatCategories, insertedSeafoodCategories, insertedProduceCategories, insertedDairyCategories }) => {
  return [
    { title: "Meat", categories: insertedMeatCategories.map(cat => cat._id) },
    { title: "Seafood", categories: insertedSeafoodCategories.map(cat => cat._id) },
    { title: "Produce", categories: insertedProduceCategories.map(cat => cat._id) },
    { title: "Dairy", categories: insertedDairyCategories.map(cat => cat._id) },
    // { title: "Baked Goods" },
    // { title: "Beverages" },
    // { title: "Office Supplies" },
    // { title: "Prepared Meals" },
    // { title: "Paper Products" },
    // { title: "Cleaning Supplies" },
    // { title: "Frozen" },
    // { title: "Baking, Spices and Condiments" },
    // { title: "Canned Goods" },
    // { title: "Sauces" },
    // { title: "Grains" },
    // { title: "Bread" },
    // { title: "Snacks" },
    // { title: "Vitamins" },
    // { title: "Hygiene" },
    // { title: "Other" },
  ];
};

const meatCats = [{ title: "Chicken" }, { title: "Beef" }, { title: "Pork" }]
const seafoodCats = [{ title: "Fish" }, { title: "Shellfish" }]
const produceCats = [{ title: "Fruits" }, { title: "Vegetables" }, { title: "Prepared" }]
const dairyCats = [{ title: "Milk" }, { title: "Cheese" }, { title: "Eggs" }]

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
    const departmentData = generateDepartments({ insertedMeatCategories, insertedSeafoodCategories, insertedProduceCategories, insertedDairyCategories });
    const insertedDepartments = await Department.insertMany(departmentData);
    console.log(insertedDepartments)
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

seed()

