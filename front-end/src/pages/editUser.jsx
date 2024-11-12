import { useEffect, useState } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const [dataUser, setdataUser] = useState(null);
  const [updateUser, setupdateUser] = useState({
    username: "",
    password: "",
    role: "",
    fiturIds: [],
  });
  const [features, setFeatures] = useState([]);
  const [userFeatures, setUserFeatures] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const endPoint = `http://localhost:3000/api/v1/admin/${id}`;
  const endPointPut = `http://localhost:3000/api/v1/admin/update/${id}`;
  const endPointUserFitur = `http://localhost:3000/api/v1/userFitur/${id}`;

  // Fetch user's features
  useEffect(() => {
    const fetchUserFeatures = async () => {
      try {
        const response = await fetch(endPointUserFitur);
        const data = await response.json();
        if (response.ok && data.payload?.datas) {
          const userFeatureIds = data.payload.datas.map((feature) =>
            feature.id_fitur.toString()
          );
          setUserFeatures(userFeatureIds);
          setupdateUser((prev) => ({
            ...prev,
            fiturIds: userFeatureIds,
          }));
        }
      } catch (error) {
        console.error("Error fetching user features:", error);
      }
    };

    fetchUserFeatures();
  }, [endPointUserFitur]);

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const response = await fetch(endPoint);
        const data = await response.json();

        if (data.payload?.datas && data.payload.datas.length > 0) {
          const userData = data.payload.datas[0];
          setdataUser(userData);
          setupdateUser((prev) => ({
            ...prev,
            username: userData.username || "",
            password: "",
            role: userData.role || "",
          }));
        } else {
          throw new Error("Data user tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Gagal mengambil data user. Silakan coba lagi.");
        navigate("/users");
      }
    };

    getFetchData();
  }, [id, endPoint, navigate]);

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
    if (updateUser.role === "admin utama" && features.length > 0) {
      setupdateUser((prev) => ({
        ...prev,
        fiturIds: features.map((feature) => feature.id_fitur.toString()),
      }));
    }
  }, [updateUser.role, features]);

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
        alert("Data updated successfully!");
        navigate("/users");
      } else {
        alert("Failed to update data: " + result.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Terjadi kesalahan saat mengupdate user.");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setupdateUser((prev) => {
      const newDataForm = {
        ...prev,
        [id]: value,
      };

      if (value === "admin utama" && features.length > 0) {
        newDataForm.fiturIds = features.map((feature) =>
          feature.id_fitur.toString()
        );
      } else if (value !== "admin utama") {
        // Preserve existing feature selections when changing to non-admin utama
        newDataForm.fiturIds = userFeatures;
      }

      return newDataForm;
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
                </select>
              </div>

              {updateUser.role !== "admin utama" && (
                <div className="flex flex-col gap-y-2 md:text-xl">
                  <label className="text-black font-bold">Fitur</label>
                  {features.map((feature) => (
                    <div key={feature.id_fitur} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`feature-${feature.id_fitur}`}
                        value={feature.id_fitur.toString()}
                        checked={updateUser.fiturIds.includes(
                          feature.id_fitur.toString()
                        )}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          setupdateUser((prev) => {
                            const newFiturIds = checked
                              ? [...prev.fiturIds, value]
                              : prev.fiturIds.filter((id) => id !== value);
                            return { ...prev, fiturIds: newFiturIds };
                          });
                        }}
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
              )}

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
