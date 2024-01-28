const User = require("../../models/user.model");

const { SERVER_MESSAGES } = require("../../constants");

const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    res.status(201).json({ newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: SERVER_MESSAGES[500] });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return users;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: SERVER_MESSAGES[500] });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (user === null || !user) {
      res.status(404).json({ message: SERVER_MESSAGES[404] });
    }

    return user;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: SERVER_MESSAGES[500] });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
