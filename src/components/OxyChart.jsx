import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const oxygenData = [
  { date: "2025-09-18", oxygenLevel: 98 },
  { date: "2025-09-19", oxygenLevel: 97 },
  { date: "2025-09-20", oxygenLevel: 96 },
  { date: "2025-09-21", oxygenLevel: 95 },
  { date: "2025-09-22", oxygenLevel: 97 },
  { date: "2025-09-23", oxygenLevel: 99 },
  { date: "2025-09-24", oxygenLevel: 94 },
];

const dates = oxygenData.map(d => d.date);
const levels = oxygenData.map(d => d.oxygenLevel);

const data = {
  labels: dates,
  datasets: [
    {
      label: 'Oxygen Level (%)',
      data: levels,
      borderColor: 'green',
      backgroundColor: 'rgba(0,255,0,0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Oxygen Levels Over the Last 7 Days' },
  },
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 90,
      suggestedMax: 100,
    },
  },
};

const OxygenChart = () => <Line data={data} options={options} />;

export default OxygenChart;
