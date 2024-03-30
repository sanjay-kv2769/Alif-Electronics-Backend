const mongoose = require('mongoose');
const complaintsSchema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'login_tb',
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },

  date: { type: String },
  status: { type: String, default: 'pending' },
  reply: { type: String, default: '...' },
});

var complaintsDB = mongoose.model('complaints_tb', complaintsSchema);
module.exports = complaintsDB;
