const express = require("express")
const  {userSignup, userlogin, userAddress, getAllUser}  = require("../Controller/UserController")
const { authToken } = require("../middleware/auth")
const router = express.Router()



router.route("/signup").post(userSignup)
router.route("/login").post(userlogin)
router.route("/address_create").post(authToken, userAddress)
router.route("/users").get(authToken, getAllUser)
   


module.exports = router