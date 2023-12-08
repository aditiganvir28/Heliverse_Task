const mongoose = require('mongoose')
require('dotenv').config()

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  domain: {
    type: String,
    required: true,
  },

  available: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Users', userSchema)