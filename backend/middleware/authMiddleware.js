const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  // console.log(req.headers.authorization)
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWM3NTc4MzBjODJmYjc2ZWY0ZDMxNyIsImlhdCI6MTY0NjAzMjM2MSwiZXhwIjoxNjQ4NjI0MzYxfQ.ISQuHgbha-Q4kvn8GDUEwTONK0gn_QH86E6SQKQTg78
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')
      // console.log(`token: ${token} decoded: ${decoded} user: ${req.user}`)

      next() // Continue to next middleware
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized to access this route')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized to access this route')
  }
})

module.exports = { protect }
