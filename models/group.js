const mongoose = require('mongoose');
const s3 = require('../lib/s3');
const Promise = require('bluebird');

const userImageSchema = new mongoose.Schema({
  file: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userNoteSchema = new mongoose.Schema({
  text: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});


const userRatingSchema = new mongoose.Schema({
  opinion: { type: Number },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});


const propertySchema = new mongoose.Schema({
  listingId: { type: String },
  images: [ userImageSchema ],
  notes: [ userNoteSchema ],
  rating: [ userRatingSchema]
});

const groupSchema = new mongoose.Schema({
  properties: [ propertySchema ],
  groupName: { type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

userImageSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.file) return null;
    if(this.file.match(/^http/)) return (this.file);
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.file}`;
  });

groupSchema
  .virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'group'
  })
  .set(function setUsers(users) {
    this._users = users;
  });

groupSchema.pre('save', function addGroupToUsers(next) { //What this is  in essence doing is finding all the users that have been added to a group and pre saving addes the group id to each of the users. This in turn then virtually populates the group with the users - this was a revelation and massively eased the user to group relationship
  this.model('User')
    .find({ _id: this._users })
    .exec()
    .then((users) => {
      const promises = users.map((user) => {
        user.group = this.id;
        user.save();
      });

      return Promise.all(promises);
    })
    .then(next)
    .catch(next);
});




















// groupSchema.pre('update', function addGroupToUsers(next) {
//   this.model('User')
//     .find({ _id: this._users })
//     .exec()
//     .then((users) => {
//       const promises = users.map((user) => {
//         user.group = this.id;
//         user.save();
//       });
//
//       return Promise.all(promises);
//     })
//     .then(next)
//     .catch(next);
// });
//

userImageSchema.pre('remove', function deleteImage(next) {
  if(this.file) return s3.deleteObject({ Key: this.file}, next);
  next();
});


module.exports = mongoose.model('Group', groupSchema);
