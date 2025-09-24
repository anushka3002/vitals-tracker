import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BloodChart = () => {

const { vitals } = useSelector(state => state.vitals)

const dates = vitals?.map(d => d.date);
const systolic = vitals?.map(d => d.bloodPressureSys);
const diastolic = vitals?.map(d => d.bloodPressureDia);

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

  return <div>{vitals? <Line data={data} options={options} /> : <p>Blood chart</p>}</div>;
};

export default BloodChart;
