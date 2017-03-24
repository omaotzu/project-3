const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  properties: [propertySchema],
  groupName: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});


const propertySchema = new mongoose.Schema({
  address: {type: String, required: true},
  latitude: {type: Number},
  longitude: {type: Number},
  bedrooms: {type: Number},
  bathrooms: {type: Number},
  coverPhoto: {type: String},
  ppm: {type: Number},
  type: {type: String},
  description: {type: String},
  agentName: {type: String},
  agentContact: {type: String},
  userImages: [userImageSchema],
  userNotes: [userNoteSchema],
  rating: {type: Number}
});


const userImageSchema = new mongoose.Schema({
  image: {type: String},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});


const userNoteSchema = new mongoose.Schema({
  text: {type: String},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});



module.exports = mongoose.model('Group', groupSchema);
