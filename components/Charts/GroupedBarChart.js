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
  const labels = [props.game];

  const matchHistoryGame = props.matchhistory.filter((match) => {
    if (match.game == props.game && match.username == props.username)
      return match;
  });
  var sumScoresGame = 0;
  for (var i = 0; i < matchHistoryGame.length; i++) {
    sumScoresGame += matchHistoryGame[i].score;
  }
  var sumScoresAll = 0;
  for (var i = 0; i < props.matchhistory.length; i++) {
    if (props.matchhistory[i].game == props.game)
      sumScoresAll += props.matchhistory[i].score;
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Your Average",
        data: labels.map(() => sumScoresGame / matchHistoryGame.length), // get average score given game
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Average",
        data: labels.map(() => sumScoresAll / props.matchhistory.length), // get average playerbase score given game
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
