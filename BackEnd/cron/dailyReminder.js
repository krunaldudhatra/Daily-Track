import cron from 'node-cron';
import User from '../models/User.js';
import { sendReminderEmail } from '../utils/sendReminderEmail.js';

cron.schedule('0 9 * * *', async () => {
  const users = await User.find({});
  for (const user of users) {
    await sendReminderEmail(user.email, user.name);
  }
});
