import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GroupedBarChart(props) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };
  const labels = [
    props.game
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Your Scores",
        data: labels.map(() => Math.floor(Math.random() * 2001) - 1000), // get best score given game
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Average",
        data: labels.map(() => Math.floor(Math.random() * 2001) - 1000), // get average playerbase score given game
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Bar options={options} data={data} />
    </div>
  );
}
