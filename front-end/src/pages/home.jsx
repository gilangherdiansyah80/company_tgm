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

  // Fungsi untuk mendapatkan data dari backend
  const getDataVisitors = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/visitors");
      const data = await response.json();
      if (data && data.payload && data.payload.datas) {
        setDataVisitors(data.payload.datas); // Set hasil data ke state
      } else {
        console.log("Data tidak tersedia", data); // Log data jika struktur tidak sesuai
      }
    } catch (err) {
      console.log("Failed to get data visitors", err);
    }
  };

  useEffect(() => {
    getDataVisitors(); // Memanggil data ketika komponen di-mount
  }, []);

  // Buat array untuk menyimpan jumlah pengunjung per bulan
  const visitorCounts = Array(12).fill(0); // Inisialisasi dengan 12 bulan

  // Mapping nama bulan dari string ke index array (0 = Januari, 1 = Februari, dst.)
  const monthMapping = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };

  // Isi array sesuai bulan berdasarkan hasil dari backend
  dataVisitors.forEach((visitor) => {
    const monthIndex = monthMapping[visitor.month]; // Dapatkan index bulan dari mapping
    if (monthIndex !== undefined) {
      visitorCounts[monthIndex] = visitor.count || 0; // Pastikan untuk mengatur default ke 0 jika undefined
    }
  });

  // Label bulan yang sesuai
  const labels = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Data untuk chart
  const data = {
    labels,
    datasets: [
      {
        label: "Pengunjung",
        data: visitorCounts, // Masukkan jumlah pengunjung per bulan
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
        text: "Jumlah Pengunjung per Bulan",
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

        {/* Menampilkan total pengunjung keseluruhan */}
        <h1>
          Total Data Pengunjung:{" "}
          {visitorCounts.reduce((acc, val) => acc + val, 0)}
        </h1>
      </section>
    </AuthLayout>
  );
};

export default Home;
