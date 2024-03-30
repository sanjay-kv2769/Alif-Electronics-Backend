const mongoose = require('mongoose');
const ordersSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product_tb',
    required: true,
  },
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'login_tb',
    required: true,
  },
  address: {
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    pincode: { type: String },
    state: { type: String },
    city: { type: String },
    landmark: { type: String },
  },
  order_date: { type: String, require: true },
  order_status: { type: String, default: 'pending', require: true },
});

var ordersDB = mongoose.model('orders_tb', ordersSchema);
module.exports = ordersDB;
