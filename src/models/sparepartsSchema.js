const mongoose = require('mongoose');
const sparepartsSchema = new mongoose.Schema({
  part_name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true }, //lens,frame,sunglass
  model: { type: String, required: true }, //polarized, UV protection, mirrored in lens
  color: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

var sparepartsDB = mongoose.model('spareparts_tb', sparepartsSchema);
module.exports = sparepartsDB;
