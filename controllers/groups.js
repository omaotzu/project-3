const Group = require('../models/group');

function indexGroup(req, res, next) {
  Group
    .find()
    .populate('user')
    .exec()
    .then((groups) => res.json(groups))
    .catch(next);
}

function showGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('user')
    .exec()
    .then((group) => {
      if(!group) return res.notFound();
      res.json(group);
    })
    .catch(next);
}
module.exports = {
  index: indexGroup,
  show: showGroup
};
