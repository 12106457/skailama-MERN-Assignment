const express = require("express");
const {createProject,getUserProjects} = require("../controller/projectController");
const router = express.Router();
const middleware=require("../middleware/verifyToken");

router.use(middleware);

router.post("/create", createProject);

router.get("/get/:userId", getUserProjects);




module.exports = router;