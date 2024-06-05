const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

router.get("/", users.listUsers);
router.get("/:_id", users.getUser);
router.put("/:_id", users.updateUser);
router.get("/:_id/categories", users.getUserCategories);
router.post("/:_id/categories", users.addCategoryToUser);
router.post("/:_id/categories/remove", users.removeCategoryFromUser);
router.get("/categories/:categoryId", users.findUsersByCategory);
router.get("/:_id/messages", users.getUserMessages);

module.exports = router;
