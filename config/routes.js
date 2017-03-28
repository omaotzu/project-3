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

router.route('/groups/:id/properties')
  .get(zooplas.selectedProp);


router.route('/groups/:id')
  .get(groups.show)
  .put(groups.update)
  .delete(groups.delete)
  .post(secureRoute, groups.addProperty);



router.route('/groups/:id/properties/:listing_id')
  .get(zooplas.selectedProp)
  .delete(secureRoute, groups.deleteProperty);

router.route('/groups/:id/properties/:listing_id/notes')
  .post(secureRoute, groups.addNote);

router.route('/groups/:id/properties/:listing_id/notes/:noteId')
  .delete(secureRoute, groups.deleteNote);

// router.route('/groups/:id/properties/:listing_id/images')
  // .post(secureRoute, imageUpload, groups.addImage);

// router.route('/groups/:id/properties/:listing_id/images/:imageId')
//   .delete(secureRoute, groups.deleteImage);

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/oauth/github')
  .post(oauth.github);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
