require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const User = require("./model/user");

// Route for Register request:
app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All fields are required! ");
    }
    // Validating user model:
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send("User Already Exists. Please Login");
    }
    //Encrypt password:
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    // JWT sign-in:
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.token_key,
      // { expiresIn: "2hr" }
    );
    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Route for User Login:
app.post("/login", async (req, res) => {
  try {
    // Get User Input
    const { email, password } = req.body;
    // Check User Input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if the user exists

    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.token_key,
        // { expiresIn: "2hr" }
      );
      user.token = token;
      res.status(200).json(user);
    }

    res.status(403).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

const auth = require("./middleware/auth");

// Authentication route

app.get("/authentication", auth, (_req, res) => {
  return res.status(200).send("WELCOME!!");
});

module.exports = app;
