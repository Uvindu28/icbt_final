import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
  const totalMovies = 10;
  const upcomingMovies = 8;
  const totalBookings = 250;

  // Chart data
  const data = {
    labels: ['Total Movies', 'Upcoming Movies', 'Bookings'],
    datasets: [
      {
        label: 'Statistics',
        data: [totalMovies, upcomingMovies, totalBookings],
        backgroundColor: ['#ff0000dd', '#ff0000dd', '#ff0303'], // Red shades for bars
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Movies & Bookings Overview',
      },
    },
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {/* Number of Movies Card */}
        <div className="bg-gradient-to-r from-[#521b1b] via-[#ff0000dd] to-[#ff0303] text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Movies</h3>
          <p className="text-4xl">{totalMovies}</p>
        </div>

        {/* Number of Upcoming Movies Card */}
        <div className="bg-gradient-to-r from-[#521b1b] via-[#ff0000dd] to-[#ff0303] text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Upcoming Movies</h3>
          <p className="text-4xl">{upcomingMovies}</p>
        </div>

        {/* Number of Bookings Card */}
        <div className="bg-gradient-to-r from-[#521b1b] via-[#ff0000dd] to-[#ff0303] text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Bookings</h3>
          <p className="text-4xl">{totalBookings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 ">
      <div className="lg:col-span-2 font-poppins bg-white p-6 rounded-lg drop-shadow-2xl ">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <div className="h-96 bg-gray-200 flex items-center justify-center rounded-lg">

        <Bar data={data} options={options} />

        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold drop-shadow-2xl mb-4">Orders</h2>
        <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg">
          {/* Content for orders */}
          <p className="text-xl text-gray-500">Orders overview</p>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Home;
