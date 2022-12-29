const express = require("express");
const { registerUser, getAllUsers, getSingleUser, loginUser } = require("../Controllers/formController");
const router = express.Router();

router.route ("/register").post(registerUser);
router.route("/").get(getAllUsers)
router.route("/:id").get(getSingleUser)
router.route("/login").post(loginUser)

module.exports = router;
