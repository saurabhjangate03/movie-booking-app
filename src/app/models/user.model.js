const mongoose = require('mongoose');

const coupensSchema = new mongoose.Schema({
  id: Number,
  discountValue: Number
});

const bookingRequestsSchema = new mongoose.Schema({
  reference_number: Number,
  coupon_code: Number,
  show_id: Number,
  tickets: [Number]
});

const userSchema = new mongoose.Schema({
  userid: Number,
  email: String,
  first_name: String,
  last_name: String,
  username: String,
  contact: String,
  password: String,
  role: String,
  isLoggedIn: Boolean,
  uuid: String,
  accesstoken: String,
  coupens: [coupensSchema],
  bookingRequests: [bookingRequestsSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User