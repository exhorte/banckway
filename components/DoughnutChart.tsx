"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PALETTE = ["#17c46e", "#32de84", "#0f7f49", "#98ebc0", "#5fe0a1"];

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance);

  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: PALETTE,
        borderWidth: 0,
      },
    ],
    labels: accountNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "72%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart
