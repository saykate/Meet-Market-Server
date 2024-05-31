const express = require("express");
const router = express.Router();
const lists = require("../controllers/list.controller");

// router.put("/:_id", lists.updateList);
router.put("/:_id", lists.addListItem);
router.put("/:_id", lists.deleteListItem);
router.get("/category/:categoryId/users", lists.findUsersByCategory)

module.exports = router;
