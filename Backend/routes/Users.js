const express = require("express");
const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../routes/verifyToken");

const router = express.Router();

//Voeg user toe
router.post("/register", async (req, res) => {
  // // validatie voor het aanmaken van de user

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send({ msg: error });

  // check if user exists
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send({ msg: "User already exists" });

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create the user
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    favList: req.body.favList,
    date: req.body.date,
  });
  try {
    user.save().then((user) =>
      // attach token to user on register and send user payload to redux
      jwt.sign(
        { id: user.id },
        process.env.JWT_TOKEN,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      )
    );
  } catch (err) {
    res.status(400).send({ msg: error });
  }
});

//Log user in
router.post("/login", async (req, res) => {
  // validatie voor het inloggen van de user

  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send({ msg: error.details[0].message });

  // check if user exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send({ msg: "Email doesn't exist" });

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  // password is correct

  if (!validPassword)
    return res.status(400).send({ msg: "Password is incorrect" });

  // create and assign web token

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
  res.header("auth-token", token).json({
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Haal specifieke user op
// private route

router.get("/user", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .then((user) => res.json(user));
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
