const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String
})

let user = mongoose.model('users', userSchema)

module.exports = user