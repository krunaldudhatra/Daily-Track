import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createHabit,
  getHabits,
  checkInHabit,
  getProgress,
  updateHabit,
  deleteHabit,
  getYearlyProgress,
  getMonthlyProgress
} from '../controllers/habitController.js';

const router = express.Router();

router.use(protect);
router.post('/', createHabit);
router.get('/', getHabits);

router.get('/progress/month/:id', getMonthlyProgress);
router.get('/progress/year/:id', getYearlyProgress);

router.put('/:id', updateHabit);       // Update habit
router.delete('/:id', deleteHabit);    // Delete habit
router.post('/:id/checkin', checkInHabit);
router.get('/progress/:id', getProgress);

export default router;
