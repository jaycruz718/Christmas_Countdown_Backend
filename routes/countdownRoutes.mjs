import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  const christmas = new Date(new Date().getFullYear(), 11, 25);
  const now = new Date();
  const diff = christmas - now;

  res.json({
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  });
});

export default router;
