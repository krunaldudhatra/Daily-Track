import API from "./axios"

export const createHabit = async (habitData) => {
  const response = await API.post("/habits", habitData)
  return response.data
}

export const getAllHabits = async () => {
  const response = await API.get("/habits")
  return response.data
}

export const checkInHabit = async (habitId) => {
  const response = await API.post(`/habits/${habitId}/checkin`)
  return response.data
}

export const getHabitProgress = async (habitId) => {
  const response = await API.get(`/habits/progress/${habitId}`)
  return response.data
}

export const updateHabit = (id, data) =>
  API.put(`/habits/${id}`, data)

export const deleteHabit = (id) =>
  API.delete(`/habits/${id}`)

export const getHabitMonthlyProgress = async (habitId) => {
  const response = await API.get(`/habits/progress/month/${habitId}`);
  return response.data;
};

export const getHabitYearlyProgress = async (habitId) => {
  const response = await API.get(`/habits/progress/year/${habitId}`);
  return response.data;
};

