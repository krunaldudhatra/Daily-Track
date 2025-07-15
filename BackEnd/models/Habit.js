import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  createdAt: { type: Date, default: Date.now },
  checkIns: [Date]  // stores dates user completed the habit
});

export default mongoose.model('Habit', habitSchema);

