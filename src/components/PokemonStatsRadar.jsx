import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function PokemonStatsRadar({ stats,pokemon }) {
  const labels = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
  const values = [
    stats.hp,
    stats.attack,
    stats.defense,
    stats.specialAttack,
    stats.specialDefense,
    stats.speed,
  ];

  const totalBaseStats = values.reduce((acc, val) => acc + val, 0);

  const data = {
    labels,
    datasets: [
      {
        label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "transparent",
        pointRadius: 2.5,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 255,
        min: 0,  
        ticks: {
          stepSize: 50,
          backdropColor: "transparent",
          color: "#555",
          font: {
          size: 10,
        },
        },
        pointLabels: {
          color: "#333",
          font: { size: 10, weight: "bold" },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.formattedValue}`;
          },
        },
      },
      legend: {
        labels: {
          color: "#333",
          boxWidth: 8,
          boxHeight: 8
        },
      },
    },
  };

  return (
    <div className="w-[280px] h-[280px] text-left relative">
      <Radar data={data} options={options} />
      <p className="text-xs font-bold text-gray-700 mt-2 absolute bottom-[-20px] left-[calc(30%)]">
        Total Base Stats: <span className="text-pink-600">{totalBaseStats}</span>
      </p>
    </div>
  );
}
