import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Alumni Choices by Course and Reason'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Alumni'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Courses'
      }
    }
  }
};

const data: ChartData<'bar'> = {
  labels: ['Data Science', 'Web Development', 'Cybersecurity', 'AI/ML', 'Cloud Computing'],
  datasets: [
    {
      label: 'Career Growth',
      data: [60, 30, 40, 45, 35],
      backgroundColor: '#4CAF50'
    },
    {
      label: 'Hands-on Learning',
      data: [40, 50, 30, 40, 25],
      backgroundColor: '#2196F3'
    },
    {
      label: 'Internship Opportunity',
      data: [20, 10, 30, 25, 40],
      backgroundColor: '#FFC107'
    }
  ]
};

const AlumniBarChart: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-white dark:bg-gray-800">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white">
        Why Alumni Choose Our Courses
      </h2>
      <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        A data-driven view of alumni preferences and the reasons behind their course choices.
      </p>
    </div>

    <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-md overflow-x-auto">
      <div className="min-w-[320px] sm:min-w-full h-[300px] sm:h-[400px]">
  <Bar data={data} options={options} />
</div>

    </div>
  </div>
</section>

  );
};

export default AlumniBarChart;
