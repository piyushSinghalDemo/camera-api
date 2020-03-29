const express = require("express");
const router = express.Router();
const multer = require("multer");
const Auth = require("../controllers/Auth");
const usersController = require("../controllers/userController");
const registerDetailController = require("../controllers/registerController");
const loggerController = require("../controllers/loggerController");
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to game-monk"
  });
});
router.get("/logs", loggerController.getLogLists);
router.get("/logs/:log", loggerController.getLog);
router.post("/users/login", registerDetailController.loginByUser);
router.post(
  "/users/register",
  Auth.VerifyToken,
  registerDetailController.createUser
);
router.get(
  "/users/profile",
  Auth.VerifyToken,
  registerDetailController.getProfile
);
router.put(
  "/users/password",
  Auth.VerifyToken,
  registerDetailController.updatePasswordForCurrentUser
);
router.put(
  "/users/change-password-admin",
  Auth.VerifyToken,
  registerDetailController.changePasswordForUser
);
router.post("/users/search", Auth.VerifyToken, usersController.search);
router.get("/users/activate", Auth.VerifyToken, usersController.activateUser); //same will activate and de-activate user

module.exports = router;
