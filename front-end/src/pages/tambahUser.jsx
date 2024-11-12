import { useState, useEffect } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const TambahUser = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    role: "",
    fiturIds: [],
  });
  const [features, setFeatures] = useState([]);
  const [userAdded, setUserAdded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDataForm((prev) => {
      const newDataForm = {
        ...prev,
        [id]: value,
      };
      // Jika role adalah "admin utama", tambahkan semua fitur
      if (value === "admin utama") {
        newDataForm.fiturIds = features.map((feature) =>
          feature.id_fitur.toString()
        );
      } else {
        newDataForm.fiturIds = []; // Reset fiturIds jika bukan admin utama
      }
      return newDataForm;
    });
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setDataForm((prev) => {
      const newFiturIds = checked
        ? [...prev.fiturIds, value] // Tambah jika dicentang
        : prev.fiturIds.filter((id) => id !== value); // Hapus jika tidak dicentang

      console.log("Updated fiturIds:", newFiturIds); // Debugging
      return { ...prev, fiturIds: newFiturIds };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: dataForm.username,
            password: dataForm.password,
            role: dataForm.role,
            fiturIds: dataForm.fiturIds,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUserAdded(true);
        setTimeout(() => {
          navigate("/users");
        }, 3000);
      } else {
        alert("Gagal Menambahkan User");
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/features");
        const data = await response.json();
        if (response.ok) {
          setFeatures(data.payload.datas);
        } else {
          console.error("Gagal memuat fitur");
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  useEffect(() => {
    let timer;
    if (userAdded) {
      timer = setTimeout(() => {
        setUserAdded(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [userAdded]);

  const handleOpenPassword = () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  };

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5">
        <h1 className="text-center text-2xl font-bold">Tambah User</h1>

        <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="username"
              className="text-black font-bold md:text-xl"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Input your username"
              className="p-3 rounded-lg border-black border-2 md:text-xl"
              value={dataForm.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="password"
              className="text-black font-bold md:text-xl"
            >
              Password
            </label>
            <div className="flex items-center relative">
              <input
                type="password"
                id="password"
                placeholder="*******"
                className="w-full border-black border-2 p-3 rounded-lg md:text-xl"
                value={dataForm.password}
                onChange={handleChange}
                required
              />
              <i
                className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-gray-500 md:text-xl"
                onClick={handleOpenPassword}
              ></i>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 md:text-xl">
            <label htmlFor="role" className="text-black font-bold">
              Role
            </label>
            <select
              id="role"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.role}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Role</option>
              <option value="admin utama">Admin Utama</option>
              <option value="admin kedua">Admin Kedua</option>
            </select>
          </div>

          <div className="flex flex-col gap-y-2 md:text-xl">
            <label className="text-black font-bold">Fitur</label>
            {dataForm.role !== "admin utama" &&
              features.map((feature) => (
                <div key={feature.id_fitur} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`feature-${feature.id_fitur}`}
                    value={feature.id_fitur.toString()} // Pastikan ini adalah string
                    checked={dataForm.fiturIds.includes(
                      feature.id_fitur.toString()
                    )} // Cek jika fitur sudah terpilih
                    onChange={handleFeatureChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`feature-${feature.id_fitur}`}
                    className="text-black"
                  >
                    {feature.nama_fitur}
                  </label>
                </div>
              ))}
          </div>

          <div className="flex gap-x-3 w-full">
            <button
              type="button"
              className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2 md:text-xl"
              onClick={() => navigate("/users")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 px-5 py-2 rounded-lg text-white w-1/2 md:text-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {userAdded && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">User telah ditambahkan</h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default TambahUser;
