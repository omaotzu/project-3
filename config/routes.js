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

router.route('/properties/:listingId')
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

router.route('/groups/:id')
  .get(groups.show)
  // .put(groups.update)
  .delete(groups.delete)
  .post(secureRoute, groups.addProperty);

router.route('/groups/:id/users')
  .put(groups.addUser);

router.route('/groups/:id/users/:userId')
  .delete(groups.deleteUser);

router.route('/groups/:id/properties')
  .get(zooplas.selectedProp);



router.route('/groups/:id/properties/:listingId')
  .get(zooplas.selectedProp)
  .delete(secureRoute, groups.deleteProperty);

router.route('/groups/:id/properties/:listingId/notes')
  .post(secureRoute, groups.addNote);


router.route('/groups/:id/properties/:listingId/notes/:noteId')
  .delete(secureRoute, groups.deleteNote);

router.route('/groups/:id/properties/:listingId/images')
  .post(secureRoute, imageUpload, groups.addImage);

router.route('/groups/:id/properties/:listingId/images/:imageId')
  .delete(secureRoute, groups.deleteImage);

router.route('/groups/:id/properties/:listingId/ratings')
  .post(secureRoute, groups.addRating);

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/oauth/github')
  .post(oauth.github);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
