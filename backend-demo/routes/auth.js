import express from 'express';
import { login } from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post("/", login);

router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    user: { username: req.user.username },
  });
});

export default router;