import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  registerables,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-adapter-moment";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

export default function LineChart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.game,
      },
    },
    borderColor: "#38A3A5",
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            millisecond: "h:mm A",
            second: "h:mm A",
            minute: "h:mm A",
            hour: "h:mm A",
            day: "h:mm A",
            week: "MMM DD",
            month: "MMM DD",
            quarter: "MMM DD",
            year: "MMM DD",
          },
        },
      },
      y: {
        beginAtZero: true,
        type: props.game == "slidepuzzle" ? "time" : "linear",
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: props.game,
        data: props.matchhistory
          .filter((match) => {
            if (match.game == props.game && match.username == props.username)
              return match;
          })
          .map((match) => ({
            x: match.timestamp,
            y: match.score,
          })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        showLine: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Scatter options={options} data={data} />
    </div>
  );
}
