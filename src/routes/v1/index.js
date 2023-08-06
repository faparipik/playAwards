import express from 'express';
import authRoute from './auth.route.js';
import docRoute from './docs.route.js';
import config from '../../config/config.js';

const router = express.Router();

const defaultRoutes = [{ path: '/auth', route: authRoute }];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
