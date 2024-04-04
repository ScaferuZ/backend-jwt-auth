const express = require("express");
const { userLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", async (req, res) => {
  console.log("signing up...");
  const body = req.body;
  res.status(200).json(body);
});

module.exports = router;
