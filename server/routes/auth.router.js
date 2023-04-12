const express = require("express");
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middleware/authMiddleware");
router.post("/login", userController.logIn);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration
);
router.post("/logout", userController.logOut);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUser);
router.put("/user", authMiddleware, userController.updateUser);
router.delete("/user/:id", authMiddleware, userController.deleteUser);
module.exports = router;
