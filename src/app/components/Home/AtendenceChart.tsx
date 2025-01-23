import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions,
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart: React.FC = () => {
  const data = {
    labels: ["instagram", "facebook", "yuotube"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF5733", "#33B5FF", "#FFEB33"],
        hoverBackgroundColor: ["#FF5733", "#33B5FF", "#FFEB33"],
      },
    ],
  };

 
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "left", // Legend position
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"doughnut">) {
            return tooltipItem.raw + " users"; 
          },
        },
      },
    },
    cutout: "20%",
  };

  return (
    <div className="p-5 pt-[50px]">
      <h2 className=" text-xl font-semibold mb-4 ">
        Registered attendence types
      </h2>
      <div className="w-[350px]  mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceChart;
