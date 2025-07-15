import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ChartComponent = ({ progressData, title = "Habit Progress", range }) => {
  // Function to format labels based on the range
  const formatLabel = (dateString, currentRange) => {
    const d = new Date(dateString)
    if (currentRange === "week") {
      return d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" }) // e.g., "Mon 7/15"
    } else if (currentRange === "month") {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) // e.g., "Jul 15"
    } else if (currentRange === "year") {
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" }) // e.g., "Jul 2025"
    }
    return dateString // Fallback
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container without fixed aspect ratio
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: (value) => (value === 1 ? "Done" : "Not Done"),
        },
      },
      x: {
        // Use autoSkip for better responsiveness on varying data densities
        ticks: {
          autoSkip: true,
          maxRotation: 45, // Rotate labels if needed
          minRotation: 0, // Prevent labels from rotating too little
          // Dynamically adjust font size for very dense data (e.g., 30 days)
          font: (context) => {
            const numLabels = context.chart.data.labels.length
            if (numLabels > 15 && range === "month") {
              return { size: 10 } // Smaller font for monthly view
            }
            return { size: 12 } // Default font size
          },
        },
      },
    },
  }

  const data = {
    labels: progressData.dates.map((date) => formatLabel(date, range)), // Use the new formatLabel function
    datasets: [
      {
        label: "Habit Completion",
        data: progressData.data,
        backgroundColor: progressData.data.map((val) =>
          val === 1 ? "rgba(34, 197, 94, 0.8)" : "rgba(239, 68, 68, 0.8)",
        ),
        borderColor: progressData.data.map((val) => (val === 1 ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)")),
        borderWidth: 1,
      },
    ],
  }

  return (
    <div
      className="chart-content-wrapper" // New wrapper for internal chart content
      style={{
        minHeight: "300px", // Ensure chart has a minimum height
        width: "100%",
        // No overflowX here, let Chart.js handle scaling/skipping
      }}
    >
      <Bar options={options} data={data} />
    </div>
  )
}

export default ChartComponent
