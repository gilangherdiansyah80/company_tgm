import AuthLayout from "../component/layouts/AuthLayout";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [dataVisitors, setDataVisitors] = useState([]);

  const getDataVisitors = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/visitors");
      const data = await response.json();
      setDataVisitors(data.payload.datas); // Pastikan 'datas' adalah array
    } catch (err) {
      console.log("Failed to get data visitors", err);
    }
  };

  useEffect(() => {
    getDataVisitors();
  }, []);

  // Ambil data 'count' dari dataVisitors dan buat array baru
  const visitorCounts = dataVisitors.map((visitor) => visitor.count);

  // Label bulan yang sesuai, misalnya
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  // Data untuk chart
  const data = {
    labels,
    datasets: [
      {
        label: "Pengunjung",
        data: visitorCounts, // Masukkan array count ke data di sini
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Opsi konfigurasi chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daftar Pengunjung",
      },
    },
  };

  return (
    <AuthLayout>
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold md:text-2xl">
          Hi, admin have a nice day
        </p>
        <i className="fas fa-user text-black text-xl"></i>
      </header>

      <section className="flex flex-col gap-y-5 items-center">
        <h1 className="text-xl font-bold md:text-2xl">Home</h1>

        {/* Render Chart.js Bar chart */}
        <Bar data={data} options={options} />

        {/* Menampilkan data pengunjung secara total */}
        <h1>
          Total Data Pengunjung:{" "}
          {visitorCounts.reduce((acc, val) => acc + val, 0)}
        </h1>
      </section>
    </AuthLayout>
  );
};

export default Home;
