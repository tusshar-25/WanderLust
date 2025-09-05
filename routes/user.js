const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js")

// SIGNUP route && SIGNUP POST route
router.route("/signup")
    .get(userController.signup)
    .post(wrapAsync(userController.signupPost));

// LOGIN route && LOGIN POST route
router.route("/login")
    .get(userController.login)
    .post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    userController.loginPost
);
  

// LOGOUT route
router.route("/logout")
    .get(userController.logout)

module.exports = router;