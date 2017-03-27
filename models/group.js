const mongoose = require('mongoose');

const userImageSchema = new mongoose.Schema({
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userNoteSchema = new mongoose.Schema({
  text: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const propertySchema = new mongoose.Schema({
  listingId: { type: String },
  userImages: [ userImageSchema ],
  userNotes: [ userNoteSchema ],
  rating: { type: Number }
});

const groupSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  properties: [ propertySchema ],
  groupName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Group', groupSchema);
