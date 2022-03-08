const asyncHandler = require('express-async-handler') // Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const jwt = require('jsonwebtoken') // JSON Web Token for authentication and authorization
const bcrypt = require('bcryptjs') // A library to help you hash passwords.

const User = require('../models/userModel')

// @desc    Register a new user
// @route   /api/users
// @access  Public

/**
 * 'asyncHandler' is a simple middleware for handling exceptions
 * inside of async express routes and passing them to your express
 * error handlers.
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body // destructure the request body params

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please provide all required fields')
  }

  // Check for existing user
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10) // 10 is the number of rounds
  const hashedPassword = await bcrypt.hash(password, salt) // hash the password

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  // User is created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('User could not be created')
  }
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body // destructuring

  const user = await User.findOne({ email })

  // Check User and Password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401) // Unauthorized
    throw new Error('Invalid credentials')
  }
})

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})

// Generate token
generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}
