const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies;
    if (!token) {
        throw new Error("Invalid Token!");
    }
    const decodeData = await jwt.verify(token, process.env.JWT_SECRET, { expireIn: "10d"});
    const {_id} = decodeData;
    const user = await User.findById({_id:_id});
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({
      ERROR: err.message,
    });
  }
};

const adminAuth = async (req, res, next) => {
  const role = req.user.role;
  if(role !== 'admin') {
    return res.status(403).json({
      ERROR: "Access Denied!"
    })
  }
  next();
}

module.exports = {
  userAuth,
  adminAuth
};
