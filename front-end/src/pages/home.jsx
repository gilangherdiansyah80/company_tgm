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
  const currentYear = new Date().getFullYear(); // Ambil tahun saat ini
  const futureYears = 5; // Tentukan berapa tahun ke depan yang ingin ditampilkan
  const [dataVisitors, setDataVisitors] = useState([]); // State untuk menyimpan data pengunjung
  const [selectedYear, setSelectedYear] = useState(currentYear); // Set tahun default ke tahun saat ini
  const [availableYears, setAvailableYears] = useState([]); // Tahun-tahun yang tersedia

  // Mengisi availableYears secara dinamis dari tahun saat ini hingga futureYears ke depan
  useEffect(() => {
    const years = Array.from(
      { length: futureYears + 1 },
      (_, i) => currentYear + i
    );
    setAvailableYears(years); // Set array tahun ke state
  }, [currentYear, futureYears]);

  // Fungsi untuk mendapatkan data dari backend berdasarkan tahun
  const getDataVisitors = async (year) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/visitors/${year}` // Ubah sesuai dengan endpoint yang benar
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && data.payload && data.payload.datas.length > 0) {
        setDataVisitors(data.payload.datas); // Set hasil data ke state
      } else {
        console.log(
          `Data untuk tahun ${year} belum tersedia. Menampilkan data 0.`
        );
        setDataVisitors([]); // Jika data tidak ada, set data kosong
      }
    } catch (err) {
      console.log("Failed to get data visitors", err);
    }
  };

  // Memanggil data ketika komponen di-mount atau ketika tahun berubah
  useEffect(() => {
    getDataVisitors(selectedYear);
  }, [selectedYear]);

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
  const labels = Object.keys(monthMapping); // Ambil label bulan dari monthMapping

  // Data untuk chart
  const data = {
    labels,
    datasets: [
      {
        label: `Pengunjung Tahun ${selectedYear}`,
        data: visitorCounts,
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
        text: `Jumlah Pengunjung per Bulan di Tahun ${selectedYear}`,
      },
    },
  };

  // Handle perubahan tahun pada dropdown
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  return (
    <AuthLayout title={"Dashboard"}>
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold md:text-2xl">
          Hi, admin have a nice day
        </p>
        <select
          name="years"
          id="years"
          value={selectedYear}
          onChange={handleYearChange} // Update tahun ketika dropdown berubah
          className="bg-gradient-to-l from-[#67BD5E] to-[#467840] p-2 text-white rounded-lg"
        >
          {availableYears.map((year) => (
            <option key={year} value={year} className="text-black">
              {year}
            </option>
          ))}
        </select>
      </header>

      <section className="flex flex-col gap-y-5 items-center">
        {/* Render Chart.js Bar chart */}
        <Bar data={data} options={options} />

        {/* Menampilkan total pengunjung keseluruhan */}
        <h1>
          Total Data Pengunjung Tahun {selectedYear} :{" "}
          {visitorCounts.reduce((acc, val) => acc + val, 0)}
        </h1>
      </section>
    </AuthLayout>
  );
};

export default Home;
