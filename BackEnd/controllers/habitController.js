import Habit from '../models/Habit.js';

export const createHabit = async (req, res) => {
  const { title } = req.body;
  const habit = await Habit.create({ title, user: req.user._id });
  res.json(habit);
};

export const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

export const checkInHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) return res.status(404).json({ message: 'Habit not found' });

  habit.checkIns.push(new Date());
  await habit.save();
  res.json(habit);
};

export const getProgress = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) return res.status(404).json({ message: 'Habit not found' });

  const today = new Date();
  const pastWeek = [...Array(7).keys()].map(i => {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    return d.toDateString();
  });

  const data = pastWeek.map(date =>
    habit.checkIns.some(d => new Date(d).toDateString() === date) ? 1 : 0
  ).reverse();

  res.json({ dates: pastWeek.reverse(), data });
};

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this habit' });
    }

    habit.title = req.body.title || habit.title;
    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this habit' });
    }

    await habit.deleteOne();
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMonthlyProgress = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) return res.status(404).json({ message: 'Habit not found' });

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = [...Array(daysInMonth).keys()].map(i => {
    const d = new Date(currentYear, currentMonth, i + 1);
    return d.toDateString();
  });

  const data = days.map(date =>
    habit.checkIns.some(d => new Date(d).toDateString() === date) ? 1 : 0
  );

  res.json({ dates: days, data });
};

export const getYearlyProgress = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) return res.status(404).json({ message: 'Habit not found' });

  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);

  const data = months.map(month => {
    const count = habit.checkIns.filter(date => {
      const d = new Date(date);
      return d.getFullYear() === currentYear && d.getMonth() === month;
    }).length;
    return count;
  });

  res.json({
    dates: months.map((m) =>
      new Date(0, m).toLocaleString("en-US", { month: "short" })
    ),
    data,
  });
};
