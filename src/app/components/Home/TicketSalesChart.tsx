import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TicketSaleChart: React.FC = () => {
  const ticketData = [
    { month: 'October', value: 120 },
    { month: 'November', value: 150 },
    { month: 'December', value: 250 },
    { month: 'January', value: 270 },
  ];

  const labels = ticketData.map((entry) => entry.month);
  const values = ticketData.map((entry, index) =>
    ticketData.slice(0, index + 1).reduce((acc, curr) => acc + curr.value, 0)
  );

  const data: ChartData<'line', number[], string> = {
    labels: labels,
    datasets: [
      {
        label: 'Tickets Sold',
        data: values,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.3,
        pointBorderColor: '#36A2EB',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Cumulative Monthly Ticket Sales',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tickets Sold',
        },
        ticks: {
          stepSize: 200,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TicketSaleChart;
