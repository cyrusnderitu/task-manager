// This file has the functionality of directing with regards to functionality e.g. Login, Register etc anything falling within the functionality of authentication

import express from 'express';
import { registerUser, getAllUsers, loginUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/auth/register -  Register a new user
router.post('/register', registerUser);

// GET /api/auth/users - Get all users
router.get('/users', protect, getAllUsers);

// POST /api/auth/login -  Login in as an existing user
router.post('/login', loginUser);

// routes/authRoutes.ts
router.get('/me', protect, async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
