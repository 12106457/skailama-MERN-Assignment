const express = require("express");
const {userLogin,userRegister,updateProfile} = require("../controller/authController");
const router = express.Router();
const middleware=require("../middleware/verifyToken")

router.post("/register", userRegister);

router.post("/login",userLogin );

router.put("/update", middleware,updateProfile);



module.exports = router;