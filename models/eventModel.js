const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
}, { timestamps: true });

eventSchema.virtual("availability").get(function () {
  return this.maxParticipants - this.attendees.length; // Remaining slots
});

module.exports = mongoose.model('Event', eventSchema);