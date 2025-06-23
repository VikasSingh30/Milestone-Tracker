const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema({
  milestone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tip', TipSchema);