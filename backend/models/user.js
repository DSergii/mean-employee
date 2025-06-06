const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
