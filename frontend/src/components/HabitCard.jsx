"use client"

import { useState } from "react"
import { checkInHabit, updateHabit, deleteHabit } from "../api/habit"
import { Link } from "react-router-dom"

const HabitCard = ({ habit, onUpdate }) => {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(habit.title)
  const [confirmingDelete, setConfirmingDelete] = useState(false) // State for inline delete confirmation

  const handleCheckIn = async () => {
    setLoading(true)
    try {
      await checkInHabit(habit._id)
      onUpdate()
    } catch (error) {
      alert("Error checking in habit")
      console.error("Check-in error:", error)
    }
    setLoading(false)
  }

  const handleUpdate = async () => {
    if (!newTitle.trim()) {
      alert("Title cannot be empty")
      return
    }
    try {
      await updateHabit(habit._id, { title: newTitle })
      setEditing(false)
      onUpdate()
    } catch (err) {
      alert("Error updating habit")
      console.error("Update habit error:", err)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteHabit(habit._id)
      onUpdate()
    } catch (err) {
      alert("Error deleting habit")
      console.error("Delete habit error:", err)
    } finally {
      setConfirmingDelete(false) // Reset confirmation state
    }
  }

  const isCheckedToday = () => {
    const today = new Date().toDateString()
    return habit.checkIns.some((checkIn) => new Date(checkIn).toDateString() === today)
  }

  return (
    <div className="habit-card">
      <div className="habit-info">
        {editing ? (
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="edit-input" />
        ) : (
          <h3>{habit.title}</h3>
        )}
        <p>Created: {new Date(habit.createdAt).toLocaleDateString()}</p>
        <p>Total Check-ins: {habit.checkIns.length}</p>
      </div>
      <div className="habit-actions">
        <button
          onClick={handleCheckIn}
          disabled={loading || isCheckedToday() || editing || confirmingDelete} // Disable during edit/confirm
          className={`checkin-btn ${isCheckedToday() ? "completed" : ""}`}
        >
          {loading ? "..." : isCheckedToday() ? "✅ Done Today" : "✓ Check In"}
        </button>
        <Link to={`/progress/${habit._id}`} className="progress-link">
          📈 View Progress
        </Link>

        {editing ? (
          <>
            <button onClick={handleUpdate} className="save-btn">
              💾 Save
            </button>
            <button onClick={() => setEditing(false)} className="cancel-btn">
              ✖ Cancel
            </button>
          </>
        ) : confirmingDelete ? ( // Show inline confirmation UI for delete
          <div className="inline-confirm-delete">
            <span className="confirm-text">Delete this habit?</span>
            <button onClick={handleDelete} className="confirm-yes-btn">
              Yes
            </button>
            <button onClick={() => setConfirmingDelete(false)} className="confirm-no-btn">
              No
            </button>
          </div>
        ) : (
          // Default buttons when not editing or confirming delete
          <>
            <button onClick={() => setEditing(true)} className="edit-btn">
              ✏️ Edit
            </button>
            <button onClick={() => setConfirmingDelete(true)} className="delete-btn">
              🗑️ Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default HabitCard
