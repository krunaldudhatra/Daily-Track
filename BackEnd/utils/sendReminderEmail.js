import nodemailer from 'nodemailer';

export const sendReminderEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "🕒 Daily Habit Reminder!",
    html: `<p>Hello ${name},<br>Don't forget to complete your habits today! 🚀</p>`,
  });
};
