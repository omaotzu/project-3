const router = require('express').Router();
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const imageUpload = require('../lib/imageUpload');
const oauth = require('../controllers/oauth');
const groups = require('../controllers/groups');
const secureRoute = require('../lib/secureRoute');
const zooplas = require('../controllers/zooplas');

router.route('/properties')
  .get(zooplas.properties);

router.route('/properties/:listing_id')
  .get(zooplas.selectedProp);

router.route('/users/')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(imageUpload, users.update)
  .delete(users.delete);

router.route('/groups')
  .get(groups.index)
  .post(groups.create);

router.route('/groups/properties')
  .get(zooplas.selectedProp)
  .post(secureRoute, groups.addProperty);


router.route('/groups/:id')
  .get(groups.show)
  .put(groups.update)
  .delete(groups.delete)
  .post(groups.addUsers);

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/oauth/github')
  .post(oauth.github);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
