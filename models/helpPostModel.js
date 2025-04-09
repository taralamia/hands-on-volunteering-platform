const mongoose = require('mongoose');

const helpPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  contactInfo: { type: String, required: true },  // How to contact the requester
}, { timestamps: true });

module.exports = mongoose.model('HelpPost', helpPostSchema);
