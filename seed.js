require("dotenv").config();
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_CREDS;
const Department = require("./models/Department");
const Category = require("./models/Category");

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
    {
      title: "Office Supplies",
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/office-supplies.jpeg",
      categories: insertedOfficeCategories.map((cat) => cat._id),
    },
    {
      title: "Cleaning Supplies",
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/cleaning-supplies.jpg",
      categories: insertedCleaningCategories.map((cat) => cat._id),
    },
    {
      title: "Dry Goods",
      photo: "https://photos-for-meet-market.s3.amazonaws.com/dry-goods.jpeg",
      categories: insertedDryGoodsCategories.map((cat) => cat._id),
    },
  ];
};

const categories = {
  meat: [
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
  ],
  seafood: [
    {
      title: "Fish",
      photo: "https://photos-for-meet-market.s3.amazonaws.com/fish.jpeg",
    },
    {
      title: "Shellfish",
      photo: "https://photos-for-meet-market.s3.amazonaws.com/shellfish.jpeg",
    },
  ],
  produce: [
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
  ],
  dairy: [
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
  ],
  baked: [
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
    {
      title: "Bread",
      photo: "https://photos-for-meet-market.s3.amazonaws.com/bread.jpeg",
    },
  ],
  office: [
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
  ],
  cleaning: [
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
  ],
  dryGoods: [
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
      photo:
        "https://photos-for-meet-market.s3.amazonaws.com/canned-foods.jpeg",
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
  ],
};

const insertCategories = async (categories) => {
  const categoryPromises = Object.keys(categories).map(async (key) => {
    const categoryList = categories[key];
    const categoryPromises = categoryList.map(async (category) => {
      await Category.findOneAndUpdate({ title: category.title }, category, {
        upsert: true,
        new: true,
      });
    });
    return Promise.all(categoryPromises);
  });
  return Promise.all(categoryPromises);
};

const insertDepartments = async (departments) => {
  const departmentPromises = departments.map(async (department) => {
    await Department.findOneAndUpdate({ title: department.title }, department, {
      upsert: true,
      new: true,
    });
  });
  return Promise.all(departmentPromises);
};

const seed = async () => {
  await connect();
  await insertCategories(categories);
  const insertedCategories = {
    insertedMeatCategories: await Category.find({
      title: { $in: categories.meat.map((cat) => cat.title) },
    }),
    insertedSeafoodCategories: await Category.find({
      title: { $in: categories.seafood.map((cat) => cat.title) },
    }),
    insertedProduceCategories: await Category.find({
      title: { $in: categories.produce.map((cat) => cat.title) },
    }),
    insertedDairyCategories: await Category.find({
      title: { $in: categories.dairy.map((cat) => cat.title) },
    }),
    insertedBakedCategories: await Category.find({
      title: { $in: categories.baked.map((cat) => cat.title) },
    }),
    insertedOfficeCategories: await Category.find({
      title: { $in: categories.office.map((cat) => cat.title) },
    }),
    insertedCleaningCategories: await Category.find({
      title: { $in: categories.cleaning.map((cat) => cat.title) },
    }),
    insertedDryGoodsCategories: await Category.find({
      title: { $in: categories.dryGoods.map((cat) => cat.title) },
    }),
  };
  const departments = generateDepartments(insertedCategories);
  await insertDepartments(departments);
  process.exit();
};

seed();

// require("dotenv").config();
// const mongoose = require("mongoose");
// const mongoDB = process.env.MONGO_CREDS;
// const Department = require("./models/Department");
// const Category = require("./models/Category");
// // const Product = require("../models/Product");

// const connect = async () => {
//   try {
//     await mongoose.connect(mongoDB);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const generateDepartments = ({
//   insertedMeatCategories,
//   insertedSeafoodCategories,
//   insertedProduceCategories,
//   insertedDairyCategories,
//   insertedBakedCategories,
//   insertedOfficeCategories,
//   insertedCleaningCategories,
//   insertedDryGoodsCategories,
// }) => {
//   return [
//     {
//       title: "Meat",
//       photo: "https://photos-for-meet-market.s3.amazonaws.com/meat-section.jpg",
//       categories: insertedMeatCategories.map((cat) => cat._id),
//     },
//     {
//       title: "Seafood",
//       photo:
//         "https://photos-for-meet-market.s3.amazonaws.com/seafood-section.jpg",
//       categories: insertedSeafoodCategories.map((cat) => cat._id),
//     },
//     {
//       title: "Produce",
//       photo:
//         "https://photos-for-meet-market.s3.amazonaws.com/produce-section.jpeg",
//       categories: insertedProduceCategories.map((cat) => cat._id),
//     },
//     {
//       title: "Dairy",
//       photo:
//         "https://photos-for-meet-market.s3.amazonaws.com/dairy-section.jpeg",
//       categories: insertedDairyCategories.map((cat) => cat._id),
//     },
//     {
//       title: "Baked Goods",
//       photo: "https://photos-for-meet-market.s3.amazonaws.com/bakery.jpeg",
//       categories: insertedBakedCategories.map((cat) => cat._id),
//     },
//     // { title: "Beverages" },
//     {
//       title: "Office Supplies",
//       photo:
//         "https://photos-for-meet-market.s3.amazonaws.com/office-supplies.jpeg",
//       categories: insertedOfficeCategories.map((cat) => cat._id),
//     },
//     // { title: "Prepared Meals" },
//     // { title: "Paper Products" },
//     {
//       title: "Cleaning Supplies",
//       photo:
//         "https://photos-for-meet-market.s3.amazonaws.com/cleaning-supplies.jpg",
//       categories: insertedCleaningCategories.map((cat) => cat._id),
//     },
//     // { title: "Frozen" },
//     {
//       title: "Dry Goods",
//       photo: "https://photos-for-meet-market.s3.amazonaws.com/dry-goods.jpeg",
//       categories: insertedDryGoodsCategories.map((cat) => cat._id),
//     },
//     // { title: "Bread" },
//     // { title: "Snacks" },
//     // { title: "Vitamins" },
//     // { title: "Hygiene" },
//     // { title: "Other" },
//   ];
// };

// const meatCats = [
//   {
//     title: "Chicken",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/Chicken.jpeg",
//   },
//   {
//     title: "Beef",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/beef.jpeg",
//   },
//   {
//     title: "Pork",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/pork.jpg",
//   },
// ];
// const seafoodCats = [
//   {
//     title: "Fish",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/fish.jpeg",
//   },
//   {
//     title: "Shellfish",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/shellfish.jpeg",
//   },
// ];
// const produceCats = [
//   {
//     title: "Fruits",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/fruit.jpeg",
//   },
//   {
//     title: "Vegetables",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/vegetables.jpg",
//   },
//   {
//     title: "Prepared",
//     photo:
//       "https://photos-for-meet-market.s3.amazonaws.com/preparedVeggies.jpeg",
//   },
// ];
// const dairyCats = [
//   {
//     title: "Milk",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/milk.jpeg",
//   },
//   {
//     title: "Cheese",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/cheese.jpeg",
//   },
//   {
//     title: "Eggs",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/eggs.jpeg",
//   },
// ];
// const bakedCats = [
//   {
//     title: "Muffins & Bagels",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/bagels.jpg",
//   },
//   {
//     title: "Cookies",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/cookies.jpeg",
//   },
//   {
//     title: "Cakes",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/cakes.jpeg",
//   },
// ];
// const officeCats = [
//   {
//     title: "Paper",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/paper.jpeg",
//   },
//   {
//     title: "Filing & Storage",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/filing.jpg",
//   },
//   {
//     title: "Breakroom",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/breakroom.jpg",
//   },
// ];
// const cleaningCats = [
//   {
//     title: "Laundry",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/laundry.jpeg",
//   },
//   {
//     title: "Cleaners",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/cleaners.jpeg",
//   },
//   {
//     title: "Tools",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/tools.jpeg",
//   },
//   {
//     title: "Dish Soap & Detergent",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/dish.jpg",
//   },
//   {
//     title: "Trash Bags",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/trashbags.jpeg",
//   },
// ];
// const dryGoodsCats = [
//   {
//     title: "Baking Supplies",
//     photo:
//       "https://photos-for-meet-market.s3.amazonaws.com/baking-supplies.jpeg",
//   },
//   {
//     title: "Sweeteners",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/sweeteners.jpeg",
//   },
//   {
//     title: "Spices",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/spices.jpeg",
//   },
//   {
//     title: "Soup & Broth",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/broth.jpeg",
//   },
//   {
//     title: "Sauces & Condiments",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/condiments.jpeg",
//   },
//   {
//     title: "Canned Goods",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/canned-foods.jpeg",
//   },
//   {
//     title: "Pasta & Grains",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/grains.jpeg",
//   },
//   {
//     title: "Vinegar & Oil",
//     photo:
//       "https://photos-for-meet-market.s3.amazonaws.com/oil+%26+vinegar.jpeg",
//   },
//   {
//     title: "Nut Butters & Jams",
//     photo: "https://photos-for-meet-market.s3.amazonaws.com/nut+butters.jpeg",
//   },
// ];

// const dropCollections = async () => {
//   await Department.collection.drop();
//   await Category.collection.drop();
// };

// const insertData = async () => {
//   try {
//     const insertedMeatCategories = await Category.insertMany(meatCats);
//     const insertedSeafoodCategories = await Category.insertMany(seafoodCats);
//     const insertedProduceCategories = await Category.insertMany(produceCats);
//     const insertedDairyCategories = await Category.insertMany(dairyCats);
//     const insertedBakedCategories = await Category.insertMany(bakedCats);
//     const insertedOfficeCategories = await Category.insertMany(officeCats);
//     const insertedCleaningCategories = await Category.insertMany(cleaningCats);
//     const insertedDryGoodsCategories = await Category.insertMany(dryGoodsCats);
//     const departmentData = generateDepartments({
//       insertedMeatCategories,
//       insertedSeafoodCategories,
//       insertedProduceCategories,
//       insertedDairyCategories,
//       insertedBakedCategories,
//       insertedOfficeCategories,
//       insertedCleaningCategories,
//       insertedDryGoodsCategories,
//     });
//     const insertedDepartments = await Department.insertMany(departmentData);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const seed = async () => {
//   await connect();
//   await dropCollections();
//   await insertData();
//   process.exit();
// };

// seed();
