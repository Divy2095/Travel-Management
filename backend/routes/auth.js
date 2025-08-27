const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/users", protect, userController.getAllUsers);
router.put("/users/:id/status", protect, userController.updateUserStatus);
router.delete("/users/:id", protect, userController.deleteUser);

module.exports = router;
