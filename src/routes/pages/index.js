import express from 'express';
import authPagesRoutes from './auth.pages.route.js';

const router = express.Router();

const defaultRoutes = [{ path: '/', route: authPagesRoutes }];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
