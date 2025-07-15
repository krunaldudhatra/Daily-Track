import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChartComponent = ({ completed, total }) => {
  const data = {
    labels: ["Completed", "Missed"],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ["#10b981", "#ef4444"], // green, red
        borderColor: ["#059669", "#dc2626"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className="pie-chart-container">
      <Pie data={data} options={options} />
    </div>
  )
}

export default PieChartComponent
