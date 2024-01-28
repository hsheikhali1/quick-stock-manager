const router = require("express").Router();
const userController = require("../controllers/user");

// create a new user
router.post("/users", userController.createUser);

// get all users
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);

module.exports = router;
