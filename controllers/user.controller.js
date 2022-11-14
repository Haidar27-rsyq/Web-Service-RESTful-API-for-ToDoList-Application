const User = require("../models/user");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({}, "-_v -password");

      res.status(200).json({
        message: "success get all the users",
        data: users,
      });
    } catch (error) {
      res.status(404).json({
        message: "No data found",
        error: error.message,
      });
    }
  },

  getUserByID: async (req, res) => {
    try {
      const users = await User.findById({ _id: req.params.id });

      res.json({
        message : "success",
        data: users,

      });
    } catch (error) {
      res.status(404).json({
        message: "not found",
        error: error.message,
      });
    }
  },

  updateUserByID: async (req, res) => {
    try {
      const data = req.body;
      const users = await User.findOne({ _id: req.params.id });

      if (users) {
        await User.updateOne({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        await users.save();

        res.status(201).json({
          message: "user update",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: " the user cannot be updated",
        error: error.message,
      });
    }
  },

  deleteUserByID: async (req, res) => {
    try {
      const users = await User.findOneAndDelete({ _id: req.params.id });

      res.status(201).json({
        data: users,
        message: "success delete",
      });
    } catch (error) {
      res.status(401).json({
        message: " failed delete",
        error: error.message,
      });
    }
  },
};
