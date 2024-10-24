import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../component/layouts/AuthLayout";

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [afterDelete, setAfterDelete] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(""); // Tambahkan state untuk username yang sedang login

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/api/v1/admin");
    const data = await response.json();
    setDataUsers(data.payload.datas);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting the user with id ${id}`);
      }

      // Refresh data setelah delete
      getUsers();

      // Reset ID dan tutup popup setelah penghapusan
      setDeleteId(null);
      setIsDeletePopupOpen(false);
    } catch (err) {
      console.error("Error during deletion:", err.message || err);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("user");
    setLoggedInUsername(username); // Simpan username yang sedang login
    getUsers();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeletePopupOpen(true); // Buka popup untuk konfirmasi
  };

  const cancelDelete = () => {
    setDeleteId(null); // Reset ID jika penghapusan dibatalkan
    setIsDeletePopupOpen(false); // Tutup popup
  };

  const proceedDelete = () => {
    if (deleteId) {
      handleDelete(deleteId); // Lakukan penghapusan
      setAfterDelete(true);
    }
  };

  setTimeout(() => {
    if (afterDelete) {
      setAfterDelete(false);
    }
  }, 3000);

  const isCurrentUser = (username) => {
    return loggedInUsername === username; // Cek apakah user yang login sama dengan user di list
  };

  return (
    <AuthLayout title={"Users"}>
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold md:text-2xl">
          Hi, admin have a nice day
        </p>
        <Link to="/tambahuser">
          <i className="fas fa-plus text-black text-xl md:text-2xl"></i>
        </Link>
      </header>

      <section className="overflow-x-auto lg:overflow-hidden lg:w-full">
        <table className="lg:w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2 text-center">Id</th>
              <th className="border border-black px-4 py-2 text-center">
                Username
              </th>
              <th className="border border-black px-4 py-2 text-center">
                Password
              </th>
              <th className="border border-black px-4 py-2 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUsers.map((item) => {
              const isCurrent = isCurrentUser(item.username); // Cek apakah user adalah user yang login
              return (
                <tr
                  key={item.id}
                  className="bg-white hover:bg-gray-100 text-center"
                >
                  <td className="border border-black px-4 py-2 text-black">
                    {item.id}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.username}
                  </td>
                  <td className="border border-black px-4 py-2 text-black">
                    {item.password}
                  </td>
                  <td className="border border-black px-4 py-2">
                    <div className="flex w-full gap-x-3">
                      <Link
                        to={`/edituser/${item.username}`}
                        className={`w-1/2 bg-white p-3 text-black rounded-lg text-center border border-black ${
                          isCurrent ? "" : "opacity-50 cursor-not-allowed"
                        }`} // Nonaktifkan jika bukan akun yang login
                        onClick={(e) => !isCurrent && e.preventDefault()} // Cegah tindakan jika bukan akun yang login
                      >
                        <button disabled={!isCurrent}>Edit User</button>
                      </Link>
                      <button
                        className={`bg-red-700 rounded-lg p-3 text-white w-1/2 md:text-xl ${
                          isCurrent ? "" : "opacity-50 cursor-not-allowed"
                        }`} // Nonaktifkan tombol hapus jika bukan akun yang login
                        onClick={() => isCurrent && confirmDelete(item.id)} // Cegah tindakan jika bukan akun yang login
                        disabled={!isCurrent}
                      >
                        Hapus User
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {isDeletePopupOpen && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">
              Apakah anda yakin ingin menghapus user ini?
            </h2>
            <div className="flex justify-center gap-5">
              <button
                onClick={proceedDelete}
                className="text-white px-4 py-2 rounded-lg bg-red-700"
              >
                Ya, Delete
              </button>
              <button
                onClick={cancelDelete}
                className={`bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400`}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      {afterDelete && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">User has been deleted</h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default Users;
