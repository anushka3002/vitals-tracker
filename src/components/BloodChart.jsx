import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const bloodPressureData = [
  { date: "2025-09-18", bloodPressureSys: 120, bloodPressureDia: 80 },
  { date: "2025-09-19", bloodPressureSys: 118, bloodPressureDia: 78 },
  { date: "2025-09-20", bloodPressureSys: 115, bloodPressureDia: 76 },
  { date: "2025-09-21", bloodPressureSys: 119, bloodPressureDia: 79 },
  { date: "2025-09-22", bloodPressureSys: 117, bloodPressureDia: 77 },
  { date: "2025-09-23", bloodPressureSys: 110, bloodPressureDia: 70 },
  { date: "2025-09-24", bloodPressureSys: 44,  bloodPressureDia: 44 }
];

const dates = bloodPressureData.map(d => d.date);
const systolic = bloodPressureData.map(d => d.bloodPressureSys);
const diastolic = bloodPressureData.map(d => d.bloodPressureDia);

const data = {
  labels: dates,
  datasets: [
    {
      label: 'Systolic',
      data: systolic,
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.2)',
      tension: 0.4,
    },
    {
      label: 'Diastolic',
      data: diastolic,
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,255,0.2)',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Blood Pressure Over the Last 7 Days',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 40,
      suggestedMax: 160,
    },
  },
};

const BloodChart = () => {
  return <Line data={data} options={options} />;
};

export default BloodChart;
