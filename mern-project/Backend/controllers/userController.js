const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel.js");
const asyncHandler = require("express-async-handler");
// @desc     Register new user
// @route    POST /api/goal
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name,
     email,
      password
     } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  // check user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

});

// @desc     Authentication a user
// @route    POST /api/goal/users
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;  // Extracting password from the request body

    // check email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Credential Invalid ");
    }
});

// @desc     Get a user
// @route    GET /api/goal/users/me
// @access   Public
// JWT_SECRET=yourSecretKey

// JWT_SECRET=abc123
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data display" });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
