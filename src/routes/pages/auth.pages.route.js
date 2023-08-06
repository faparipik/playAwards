import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.render('protected');
  },
);

router.get('/reset-password', (req, res) => {
  res.render('reset-password', {
    query: req.query,
  });
});

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', {
    query: req.query,
  });
});

export default router;
