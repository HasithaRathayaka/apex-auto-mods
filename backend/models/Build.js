const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carModel: String,
  color: String,
  selectedParts: {
    spoiler: String,
    rims: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Build', buildSchema);
