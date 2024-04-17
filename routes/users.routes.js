const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

router.get("/", users.listUsers);
router.get("/:_id", users.getUser);
router.put("/:_id", users.updateUser);
// router.get("/:_id/messages", users.getUserMessages);
// router.get("/:_id/lists", users.getUserLists);

module.exports = router;
