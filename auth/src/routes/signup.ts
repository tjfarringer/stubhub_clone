import express from 'express';

const router = express.Router();

// we should be recieving the email and pw from the req.body
router.post('/api/users/signup', (req, res) => {
  const { email, password } = req.body;

  // going to use <express-validator> to validate this values
});

export { router as signupRouter };
