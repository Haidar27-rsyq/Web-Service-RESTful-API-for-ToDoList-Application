const Todoolistuser = require("../models/todoolistuser");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllTodoolistuser: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistusers = await Todoolistuser.find({
        user: verified.id,
      }).populate("user", "name");

      res.status(201).json({
        message: "get all todoolisuser",
        data: todoolistusers,
      });
    } catch (error) {
      res.status(404).json({
        message: "todoolistuser not found",
        error: error.message,
      });
    }
  },
  getTodoolistuserByID: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistuser = await Todoolistuser.findById({ _id: req.params.id });

      if (todoolistuser.user == verified.id) {
        res.status(200).json({
          message: "succes get todolist user",
          data: todoolistuser,
        });
      } else {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "data todoolist not found and Unauthorized",
        error: error.message,
      });
    }
  },
  addTodoolistuser: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistuser = await Todoolistuser.create({
        title: req.body.title,
        content: req.body.content,
        user: verified.id,
      });

      await todoolistuser.save();

      res.status(201).json({
        message: "add todolistuser success",
        data: todoolistuser,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed to create todolist",
        error: error.message,
      });
    }
  },
  updateTodoolistuser: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistuser = await Todoolistuser.findOne({ _id: req.params.id });

      if (todoolistuser) {
        await Todoolistuser.updateOne({
          title: req.body.title,
          content: req.body.content,
          user: verified.id,
        });

        await todoolistuser.save();

        res.status(201).json({
          message: " data todoolistuser has been update ",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "todoolistuser cannot be updated",
      });
    }
  },

  deleteTodoolistuser: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistuser = await Todoolistuser.findOneAndDelete({
        _id: req.params.id,
      });
      if (todoolistuser.user == verified.id) {
        res.status(200).json({
          message: "success data todoolistener",
          data: todoolistuser,
        });
      } else {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "failed delete todoolistuser",
        error: error.message,
      });
    }
  },
  deleteAllTodoolistuser: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistusers = await Todoolistuser.deleteMany({
        user: verified.id,
      }).populate("user", "name");
      res.status(201).json({
        data: todoolistusers,
        message: "success delete all todoolistuser",
      });
    } catch (error) {
      res.status(401).json({
        message: "failed delete all todoolistuser",
        error: error.message,
      });
    }
  },
};
