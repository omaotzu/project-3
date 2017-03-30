const Group = require('../models/group');
// const User = require('../models/user');

function indexGroup(req, res, next) {
  Group
    .find()
    .populate('users')
    .exec()
    .then((groups) => res.json(groups))
    .catch(next);
}

function createGroup(req, res, next) {
  Group
    .create(req.body)
    .then((group) => res.status(201).json(group))
    .catch(next);
}

function showGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('users properties.images.createdBy properties.notes.createdBy properties.rating.createdBy')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      res.json(group);
    })
    .catch(next);
}

// function updateGroup(req, res, next) {
//   console.log('BEFORE', req.body);
//   Group
//     .findById(req.params.id)
//     .populate('users')
//     .exec()
//     .then((group) => {
//       if(!group) return res.notFound();
//       for(const field in req.body) {
//
//         group[field] = req.body[field];
//       }
//
//       return group.save();
//     })
//     .then((group) => res.json(group))
//     .catch(next);
// }

function addUserToGroup(req, res, next) {
  console.log('body', req.body.userId);
  console.log('params', req.params);
  Group
    .findById(req.params.id)
    .then((user) => {
      if(!user.group.includes(req.params.id)) user.group.push(req.params.id);
      return user.save();
    })
    .then((group) => res.json(group))
    .catch(next);
}

function deleteUserFromGroup(req, res, next) {
  // console.log(req.params.userId);
  Group
    .findByIdAndUpdate(req.user.id, { $pull: { users: req.params.userId } })
    .then((group) => {
      if(!group) return res.notFound();
      return group.save();
    })
    .then((group) => res.json(group))
    .catch(next);
}


function deleteGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('users')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();

      return group.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addPropertyRoute(req, res, next) {
  Group
    .findById(req.user.group)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      const property = group.properties.create(req.body);
      group.properties.push(property);
      return group.save()
        .then(() => res.json(property));
    })
    .catch(next);
}

function deletePropertyRoute(req, res, next) {
  Group
    .findById(req.user.group)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();

      const prop = group.properties.find((property) => {
        return property.listingId === req.params.listingId;
      });

      prop.remove();

      return group.save();
    })
    .then(() => res.status(204).end())
    .catch(next);

}

function addPropertyNote(req, res, next) {
  req.body.createdBy = req.user;
  Group
    .findById(req.params.id)
    .populate('users')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();

      const prop = group.properties.find((property) => {
        return property.listingId === req.params.listingId;
      });
      const note = prop.notes.create(req.body);
      prop.notes.push(note);
      return group.save()
        .then(() => res.json(note));
    })
    .catch(next);
}
function deletePropertyNote(req, res, next) {
  Group
    .findById(req.params.id)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      const prop = group.properties.find((property) => {
        return property.listingId === req.params.listingId;
      });

      const note = prop.notes.id(req.params.noteId);
      console.log(note);
      note.remove();
      return group.save()
        .then(() => res.json(note));
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addPropertyImage(req, res, next) {
  req.body.createdBy = req.user;
  if(req.file) req.body.file = req.file.filename;
  Group
    .findById(req.params.id)
    .populate('users')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();

      const prop = group.properties.find((property) => {
        return property.listingId === req.params.listingId;
      });
      const image = prop.images.create(req.body);
      prop.images.push(image);
      return group.save()
        .then(() => res.json(image));
    })
    .catch(next);
}

function deletePropertyImage(req, res, next) {
  Group
    .findById(req.params.id)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      const prop = group.properties.find((property) => {
        return property.listingId === req.params.listingId;
      });

      const image = prop.images.id(req.params.imageId);
      // console.log(note);
      image.remove();
      return group.save()
        .then(() => res.json(image));
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addPropertyRating(req, res, next) {
  req.body.createdBy = req.user;
  Group
    .findById(req.params.id)
    .populate('users')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();

      const prop = group.properties.find((property) => {
        return property.listingId === req.params.listingId;
      });
      const rating = prop.rating.create(req.body);
      prop.rating.push(rating);
      return group.save()
        .then(() => res.json(rating));
    })
    .catch(next);
}

function deletePropertyRating(req, res, next) {
  Group
    .findById(req.params.id)
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      const prop = group.properties.find((property) => {
        return property.listingId === req.params.listingId;
      });

      const rating = prop.rating.id(req.params.ratingId);
      // console.log(note);
      rating.remove();
      return group.save()
        .then(() => res.json(rating));
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexGroup,
  create: createGroup,
  show: showGroup,
  // update: updateGroup,
  addUser: addUserToGroup,
  deleteUser: deleteUserFromGroup,
  delete: deleteGroup,
  addProperty: addPropertyRoute,
  deleteProperty: deletePropertyRoute,
  addNote: addPropertyNote,
  deleteNote: deletePropertyNote,
  addImage: addPropertyImage,
  deleteImage: deletePropertyImage,
  addRating: addPropertyRating,
  deleteRating: deletePropertyRating
};
