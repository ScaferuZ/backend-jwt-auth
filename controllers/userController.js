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

const userSignup = async (req, res) => {
  console.log("Signing up");
  const { email, password } = req.body; // requesting email and password from the body
  try {
    // "User" is a schema that we created and we  perform the database operations
    const user = await User.signup(email, password);
    console.log("generating token");
    const token = generateToken(user._id);
    console.log("Token generated =" + token);
    res.status(201).json({ email, token }); // send back email and token as a response
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const userLogin = async (req, res) => {
  console.log("Signing in...");
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userLogin,
  userSignup,
};
