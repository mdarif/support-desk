const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

// Protected route (2nd argument) - protect
router.get('/me', protect, getMe)

module.exports = router
