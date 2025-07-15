# 📅 DailyTrack - Habit & Productivity Tracker

**DailyTrack** is a full-stack MERN (MongoDB, Express, React, Node.js) web application that helps users track their daily habits and visualize their consistency over time using charts and reminders.

---

## 🚀 Features

### ✅ User Authentication

* Register and login using JWT
* Passwords hashed securely with bcrypt

### 📋 Habit Management

* Create, update, delete personal habits
* View all habits with progress history

### 🕒 Daily Check-ins

* Check in once per day per habit
* Habits reset daily

### 📊 Analytics & Visualization

* Weekly, Monthly, Yearly progress charts using Chart.js
* Completion rate and check-in stats
* Bar and Pie chart views

### 📧 Email Reminders

* Daily 9AM reminder emails via Gmail
* Configurable via `node-cron` and `nodemailer`

### 🔐 Route Protection

* Private routes guarded using custom `protect` middleware
* Only habit owner can update/delete their habits

---

## 🧱 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT for auth
* node-cron + nodemailer

### Frontend

* React
* React Router
* Chart.js (via react-chartjs-2)
* Axios for API calls

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/krunaldudhatra/dailytrack.git
cd dailytrack
```

### 2. Setup Environment

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
EMAIL=your_gmail
EMAIL_PASS=your_gmail_app_password
```

### 3. Install Backend

```bash
cd backend
npm install
npm run dev
```

### 4. Install Frontend

```bash
cd ../frontend
npm install
npm run dev

---

## 🧪 API Endpoints (Sample)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Habits

* `GET /api/habits` 🔒
* `POST /api/habits` 🔒
* `PUT /api/habits/:id` 🔒
* `DELETE /api/habits/:id` 🔒

### Check-ins

* `POST /api/habits/:id/checkin` 🔒

### Progress

* `GET /api/habits/progress/:id` (Weekly)
* `GET /api/habits/progress/month/:id` (Monthly)
* `GET /api/habits/progress/year/:id` (Yearly)

### Reminder (Manual Trigger)

* `POST /api/reminders/send-reminders`

---

## 🔐 Security

* Passwords never stored in plain text
* Token-based authentication
* Authorization check for each habit owner

---

## 📆 Cron Jobs

* Uses `node-cron` to run a job every day at 9:00 AM
* Sends email reminders to all users


## 💡 Future Improvements

* Let users customize reminder time
* Add mobile responsiveness
* Weekly streak tracking
* Push notifications
