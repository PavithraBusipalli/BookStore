const { singInValidator, signUpValidator } = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegisterController = async (req, res) => {
  try {
    signUpValidator(req);
    const { name, email, password, phno, role } = req.body;
    const isUserExists = await User.findOne({ email: email });
    if (!isUserExists) {
      const hashPswd = await bcrypt.hash(password, 10);
      const newUser = User.create({
        name,
        email,
        password: hashPswd,
        phno,
        role,
      });
      (await newUser).save();
    } else {
      return res.status(403).json({
        Message: "User already exists",
      });
    }
    res.json({
      Message: "User Created Successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      ERROR: err.message,
    });
  }
};


const userLoginController = async (req, res) => {
  singInValidator(req);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPswd = await bcrypt.compare(password, user.password);
    if (isPswd) {
      const jwtSecret = process.env.JWT_SECRET;
      const token = await jwt.sign({ _id: user._id }, jwtSecret , {
        expiresIn: "10d",
      });
      res.cookie("token", token);
      res.json({
        Message: "LoggedIn successfully!!",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phno: user.phno,
            role: user.role,
          },
        },
      });
    } else {
      res.send("Invalid credentials!!");
    }
  } catch (err) {
    res.status(400).json({
      ERROR: err.message,
    });
  }
};



module.exports = {
  userLoginController,
  userRegisterController
};
