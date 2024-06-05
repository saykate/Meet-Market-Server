const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

router.get("/", users.listUsers);
router.get("/:_id", users.getUser);
router.put("/:_id", users.updateUser);
// router.get("/:_id/lists", users.getUserLists);
router.put("/:_id/category", users.addCategoryToUser);
router.delete("/:_id/category", users.removeCategoryFromUser);
router.get("/category/:categoryId/users", users.findUsersByCategory);
router.get("/:_id/messages", users.getUserMessages);

module.exports = router;
