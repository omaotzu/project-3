const Group = require('../models/group');

function indexGroup(req, res, next) {
  Group
    .find()
    .populate('user')
    .exec()
    .then((groups) => res.json(groups))
    .catch(next);
}

module.exports = {
  index: indexGroup
};
