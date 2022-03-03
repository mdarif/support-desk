const express = require('express')
const router = express.Router()
const { getTickets, createTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

// Protected route to create the ticket
router
  .route('/')
  .get(protect, getTickets)
  .post(protect, createTicket)

module.exports = router
