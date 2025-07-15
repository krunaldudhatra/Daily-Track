"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getHabitProgress, getHabitMonthlyProgress, getHabitYearlyProgress } from "../api/habit"
import ChartComponent from "../components/ChartComponent"
import PieChartComponent from "../components/PieChartComponent"

const ProgressPage = () => {
  const { id } = useParams()
  const [progressData, setProgressData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState("week")

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        let data
        if (range === "month") {
          data = await getHabitMonthlyProgress(id)
        } else if (range === "year") {
          data = await getHabitYearlyProgress(id)
        } else {
          data = await getHabitProgress(id)
        }
        setProgressData(data)
      } catch (error) {
        console.error("Error fetching progress:", error)
      }
      setLoading(false)
    }
    fetchProgress()
  }, [id, range])

  if (loading) {
    return <div className="loading">Loading progress...</div>
  }

  if (!progressData) {
    return <div className="error">Error loading progress data.</div>
  }

  const completed = progressData.data.filter((d) => d === 1).length
  const total = progressData.data.length
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0

  return (
    <div className="progress-page">
      <div className="progress-header">
        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
        <h1>{range.charAt(0).toUpperCase() + range.slice(1)} Progress</h1>
        <div className="range-selector-group">
          <label htmlFor="range">View:</label>
          <select
            id="range"
            value={range}
            onChange={(e) => {
              setRange(e.target.value)
              setLoading(true)
            }}
            className="range-select"
          >
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div className="stats mt-4">
          <div className="stat-card">
            <h3>{completionRate}%</h3>
            <p>Completion Rate</p>
          </div>
          <div className="stat-card">
            <h3>
              {completed}/{total}
            </h3>{" "}
            <p>{range === "year" ? "Months Completed" : "Days Completed"}</p>
          </div>
        </div>
      </div>
      <div className="charts-grid">
        <div className="chart-container">
          <ChartComponent
            progressData={progressData}
            title={`${range.charAt(0).toUpperCase() + range.slice(1)} Progress`}
            range={range}
          />
        </div>
        <div className="chart-container">
          <PieChartComponent completed={completed} total={total} />
        </div>
      </div>
    </div>
  )
}

export default ProgressPage
