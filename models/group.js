const mongoose = require('mongoose');
// const s3 = require('../lib/s3');
const userImageSchema = new mongoose.Schema({
  file: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userNoteSchema = new mongoose.Schema({
  text: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const propertySchema = new mongoose.Schema({
  listingId: { type: String },
  images: [ userImageSchema ],
  notes: [ userNoteSchema ],
  rating: { type: Number }
});

const groupSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  properties: [ propertySchema ],
  groupName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});
//
// userImageSchema
//   .virtual('imageSRC')
//   .get(function getImageSRC() {
//     if(!this.file) return null;
//     if(this.file.match(/^http/)) return (this.file);
//     return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.file}`;
//   });
//
// userImageSchema.pre('remove', function deleteImage(next) {
//   if(this.file) return s3.deleteObject({ Key: this.file}, next);
//   next();
// });


module.exports = mongoose.model('Group', groupSchema);
