import express from 'express';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// made an assumption that we need to run requireauth after currentuser
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
