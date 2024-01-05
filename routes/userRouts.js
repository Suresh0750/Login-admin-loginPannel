const express = require("express");
const router = express.Router();

const userControll = require("../controller/userController.js");

router.get("/", userControll.loginPage);
router.post("/home", userControll.homePage);
router.get("/signUp", userControll.singUpPage);
router.post("/loginPage", userControll.redirect);
router.post("/logout", userControll.logout);


module.exports = router;
