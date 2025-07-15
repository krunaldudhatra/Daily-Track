"use client"

import { useState, useEffect } from "react"
import { getAllHabits } from "../api/habit"
import HabitCard from "../components/HabitCard"
import HabitForm from "../components/HabitForm"

const Dashboard = () => {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchHabits = async () => {
    try {
      const data = await getAllHabits()
      setHabits(data)
    } catch (error) {
      console.error("Error fetching habits:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return <div className="loading">Loading your habits...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Daily Habits</h1>
        <p>Track your progress and build better habits!</p>
      </div>

      <HabitForm onHabitCreated={fetchHabits} />

      <div className="habits-grid">
        {habits.length === 0 ? (
          <div className="no-habits">
            <h3>No habits yet!</h3>
            <p>Create your first habit above to get started.</p>
          </div>
        ) : (
          habits.map((habit) => <HabitCard key={habit._id} habit={habit} onUpdate={fetchHabits} />)
        )}
      </div>
    </div>
  )
}

export default Dashboard
