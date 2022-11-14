const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registerAuth: async (req, res) => {
    try {
      const data = req.body;

      passwordHash = bcrypt.hashSync(req.body.password, 8);
      data.password = passwordHash;
      const user = await new User(data);
      user.save();

      res.status(201).json({
        message: "data created",
      });
    } catch (error) {
      res.status(401).json({
        message: "failed to create a user",
        error: error.message,
      });
    }
  },

  loginAuth: async (req, res) => {
    try {
      const data = await req.body;
      const user = await User.findOne({ email: data.email });
      if (user) {
        const cekPassword = bcrypt.compareSync(data.password, user.password);

        if (cekPassword) {
          const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            "secret",
            { expiresIn: "1d" }
          );

          res.status(200).json({
            message: "success",
            token: token,
          });
        } else {
          res.status(401).json({
            message: "Invalid Email or Password",
          });
        }
      } else {
        res.status(401).json({
          message: "Invalid Email or Password",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "invalid login",
        error: error.message,
      });
    }
  },
};
