const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");

// generate JWT token
const generateToken = (_id) => {
  return jwt.sign(
    { _id }, // payload that we want to use
    process.env.SECRET_KEY, // a secret random string, complicated the better
    { expiresIn: "3d" }, // expire token in 3 days
  );
};

const user_login = async (req, res) => {
  console.log("Signing in...");
  const body = req.body;
  res.status(200).json(body);
};
