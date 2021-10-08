const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articleW' }]
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel