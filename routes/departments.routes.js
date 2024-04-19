const express = require("express");
const router = express.Router();
const departments = require("../controllers/department.controller");

router.get("/", departments.listDepartments);
router.get("/:_id", departments.getDepartment);

module.exports = router;