const router = require('express').Router();
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const imageUpload = require('../lib/imageUpload');
const oauth = require('../controllers/oauth');
const groups = require('../controllers/groups');
// const secureRoute = require('../lib/secureRoute');
const zoopla = require('../controllers/zooplas');

router.route('/properties')
  .get(zoopla.properties);





router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(imageUpload, users.update)
  .delete(users.delete);

router.route('/groups')
  .get(groups.index);

router.route('/groups/:id')
  .get(groups.show);

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/oauth/github')
  .post(oauth.github);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
