const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { User } = require("../../models/userModel");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send("User with given Email is Already registered...!!!");
  try {
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.generateHashPassword();
    await user.save();
    return res.send(_.pick(user, ["name", "email"]));
  } catch (err) {
    return res.status(400).send("Invalid Data...!!!");
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email or Password...!!!");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).send("Invalid Email or Password...!!!");

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      config.get("jwtPrivateKey")
    );
    res.send(token);
    res.header("x-auth-token", token);

    // return res.send(_.pick(user, ["name", "email"]));
  }
  catch (error) {
    console.error('Error in login route:', error);
    res.status(500).send('Internal Server Error');
  }
});

function validateRegister() {
  return [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
}

module.exports = router;

//HASH Method
/*
router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send("User with given Email is Already registered...!!!");
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
*/

