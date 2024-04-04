const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  uploaded_by: { type: Number, default: '' },
});

var productsDB = mongoose.model('products_tb', productsSchema);
module.exports = productsDB;
