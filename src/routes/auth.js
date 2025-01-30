const express = require("express");
const router = express.Router();
const { userRegisterController, userLoginController } = require("../controllers/auth");


router.post("/signup", userRegisterController);
router.post("/signin", userLoginController);

module.exports = {
  authRouter: router,
};
