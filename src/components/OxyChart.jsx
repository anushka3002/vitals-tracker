import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OxygenChart = () => {

  const { vitals } = useSelector(state => state.vitals)

const dates = vitals.length > 0 ? vitals?.map(d => d.date) : 0;
const levels = vitals.length > 0 ? vitals?.map(d => d.pulseOx) : 0;

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

  return (
<div>{vitals? <Line data={data} options={options} />: <p>Oxygen chart</p>}</div>
  )
}


export default OxygenChart;
