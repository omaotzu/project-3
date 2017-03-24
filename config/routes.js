const router = require('express').Router();
const auth = require('../controllers/auth');

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(auth.register);

router.all('/*', (req, res) => res.notFound());

module .exports = router;
