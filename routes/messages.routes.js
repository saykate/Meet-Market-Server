const express = require("express");
const router = express.Router();
const messages = require("../controllers/message.controller");

router.post("/", messages.createMessage);
router.get("/:_id", messages.getMessage);
router.delete("/:_id", messages.deleteMessage);

module.exports = router;