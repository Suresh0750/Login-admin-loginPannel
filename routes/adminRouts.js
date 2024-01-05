const express = require("express")
const router = express.Router()
const adminController = require("../controller/adminController.js")


router.get("/admin",adminController.admin)
router.get("/edit:id",adminController.dataEdit)
router.post("/add",adminController.addData)
//deleter data
router.get("/dataDelete:id",adminController.deleteData)
router.post("/adminHome",adminController.adminHome)
router.post("/adminLogOut",adminController.adminLogout)
router.post("/addUser",adminController.addUser)
router.post("/addData",adminController.adminAdd)
router.post("/update:id",adminController.updateData)

//search data of user
router.post("/searchUser",adminController.searchUser)
//not webpage
router.get("*/",adminController.error)
module.exports=router