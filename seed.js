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

const generateDepartments = () => {
  return [
    { title: "Meat" },
    { title: "Seafood" },
    { title: "Produce" },
    { title: "Dairy" },
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

const generateCategories = (departments) => {
  const categories = [];
  departments.forEach((department) => {
    switch (department.title) {
      case "Meat":
        categories.push({ title: "Chicken", department: department._id });
        categories.push({ title: "Beef", department: department._id });
        categories.push({ title: "Pork", department: department._id });
        break;
      case "Seafood":
        categories.push({ title: "Fish", department: department._id });
        categories.push({ title: "Shellfish", department: department._id });
        break;
      case "Dairy":
        categories.push({ title: "Milk", department: department._id });
        categories.push({ title: "Cheese", department: department._id });
        categories.push({ title: "Eggs", department: department._id });
        break;
      case "Produce":
        categories.push({ title: "Fruits", department: department._id });
        categories.push({ title: "Vegitables", department: department._id });
        categories.push({ title: "Prepared", department: department._id });
        break;
    }
  });
  return categories;
};

const dropCollections = async () => {
  await Department.collection.drop();
  await Category.collection.drop();
};

const insertData = async () => {
  try {
    const departmentData = generateDepartments();
    const insertedDepartments = await Department.insertMany(departmentData);
    const categoriesData = generateCategories(insertedDepartments);
    const insertedCategories = await Category.insertMany(categoriesData);
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

