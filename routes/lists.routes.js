const express = require("express");
const router = express.Router();
const lists = require("../controllers/list.controller");

router.put("/:_id", lists.updateList);
router.get("/category/:categoryId/users", lists.findUsersByCategory)

module.exports = router;
