const User = require("../../models/user.model");

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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = (req, res) => {};

module.exports = {
  createUser,
  getAllUsers,
};
