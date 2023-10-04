const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes for user operations
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;
