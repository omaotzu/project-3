const Group = require('../models/group');
const User = require('../models/user');

function indexGroup(req, res, next) {
  Group
    .find()
    .populate('users')
    .exec()
    .then((groups) => res.json(groups))
    .catch(next);
}

function createGroup(req, res, next) {
  console.log(req.body);
  Group
    .create(req.body)
    .then((group) => res.status(201).json(group))
    .catch(next);
}

function showGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('users')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      res.json(group);
    })
    .catch(next);
}

function updateGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('users')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();

      for(const field in req.body) {
        group[field] = req.body[field];
      }

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

function addUsers(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('users')
    .exec()
    .then((group) => {
      User
        .findOne({username: req.body.username})
        .then((user) => {
          const userId = user.userId;
          group.users.push(userId);
        });
    })
    .catch(next);
}

function addPropertyRoute(req, res, next) {
  Group
    .findOne({ users: req.user.id })
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


module.exports = {
  index: indexGroup,
  create: createGroup,
  show: showGroup,
  update: updateGroup,
  delete: deleteGroup,
  addUsers: addUsers,
  addProperty: addPropertyRoute
};
