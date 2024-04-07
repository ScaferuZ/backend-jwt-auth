const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");

// this middleware will run frist before any request to verify the token
const requireAuth = async (req, res, next) => {
  // every request will send the token with
  // fetch('/api/user/payment', {
  // method: "GET",
  // headers: {
  //  Authorization: `Bearer ${token}`,
  //  "Content-Type": "application/json
  // }
  // })
  const { authorization } = req.headers; // grab the authorization header

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
  }

  console.log("Authorization token: ", authorization);

  // get the token and ignore the bearer string
  const token = authorization.split(" ")[1];

  try {
    // JWT verifies the token and return the ID of user if sucess
    const { _id } = await jwt.verify(token, process.env.SECRET_KEY);
    // search DB and get user object and create
    // new request paramater with "user" which will be supplied to every
    // other request down the tree
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    res.status(401).json({ err });
  }
};

module.exports = requireAuth;
