import { useEffect, useState } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const [dataUser, setdataUser] = useState(null);
  const [updateUser, setupdateUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const endPoint = `http://localhost:3000/api/v1/admin/${id}`;
  const endPointPut = `http://localhost:3000/api/v1/admin/update/${id}`;

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const response = await fetch(endPoint);
        const data = await response.json();

        // Cek apakah ada data yang didapatkan dan validasi panjang array
        if (data.payload?.datas && data.payload.datas.length > 0) {
          const userData = data.payload.datas[0]; // Ambil data pertama jika banyak
          setdataUser(userData);
          setupdateUser({
            username: userData.username || "", // Set username jika ada, jika tidak, set sebagai string kosong
            password: userData.password || "", // Set password sebagai string kosong agar bisa diubah
            role: userData.role || "",
          });
        } else {
          throw new Error("Data user tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Gagal mengambil data user. Silakan coba lagi.");
        navigate("/users"); // Redirect ke halaman daftar pengguna jika data gagal diambil
      }
    };

    getFetchData();
  }, [id, endPoint, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(endPointPut, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.removeItem("user");
        alert("Data updated successfully!");
        localStorage.setItem("user", updateUser.username);
        navigate("/users"); // Navigasi setelah sukses
      } else {
        alert("Failed to update data: " + result.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Terjadi kesalahan saat mengupdate user.");
    }
  };

  const handleChange = (e) => {
    setupdateUser({
      ...updateUser,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5 items-center w-full">
        <h1 className="text-xl font-bold">Edit Pengguna</h1>

        <div className="flex flex-col gap-y-3 w-full">
          {dataUser ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-3">
                <label htmlFor="username" className="font-bold md:text-xl">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  className="border-black border-2 rounded-md p-2 md:text-xl"
                  value={updateUser.username}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <label htmlFor="password" className="md:text-xl">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  className="border-black border-2 rounded-md p-2 md:text-xl"
                />
              </div>

              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="role" className="text-black font-bold">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateUser.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Role</option>
                  <option value="admin utama">Admin Utama</option>
                  <option value="admin kedua">Admin Kedua</option>
                  <option value="admin ketiga">Admin Ketiga</option>
                </select>
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
                  Save
                </button>
              </div>
            </form>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </section>
    </AuthLayout>
  );
};

export default EditUser;
