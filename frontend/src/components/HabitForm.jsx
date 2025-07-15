"use client"

import { useState } from "react"
import { createHabit } from "../api/habit"

const HabitForm = ({ onHabitCreated }) => {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      await createHabit({ title })
      setTitle("")
      onHabitCreated()
    } catch (error) {
      alert("Error creating habit")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter new habit (e.g., Wake up at 6AM)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="habit-input"
        />
        <button type="submit" disabled={loading} className="add-btn">
          {loading ? "Adding..." : "+ Add Habit"}
        </button>
      </div>
    </form>
  )
}

export default HabitForm
