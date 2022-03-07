const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: [
        'iPhone',
        'iPad',
        'MacBook',
        'Macbook Pro',
        'iMac',
        'iPod',
        'iPod touch'
      ]
    },
    description: {
      type: String,
      required: [true, 'Please enter a decription of the issue']
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'close'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
