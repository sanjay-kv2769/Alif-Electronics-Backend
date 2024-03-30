const mongoose = require('mongoose');
const technicianSchema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'login_tb',
    required: true,
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  place: { type: String, required: true },
});

var technicianDB = mongoose.model('technician_tb', technicianSchema);
module.exports = technicianDB;
