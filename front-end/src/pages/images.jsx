import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../component/layouts/AuthLayout";

const Images = () => {
  const [dataImages, setDataImages] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [afterDelete, setAfterDelete] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState("");

  const getImages = async () => {
    const response = await fetch("http://localhost:3000/api/v1/Images");
    const data = await response.json();
    setDataImages(data.payload.datas);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/Images/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting the booking with id ${id}`);
      }

      // Refresh data setelah delete
      getImages();

      // Reset ID dan tutup popup setelah penghapusan
      setDeleteId(null);
      setIsDeletePopupOpen(false);
    } catch (err) {
      console.error("Error during deletion:", err.message || err);
    }
  };

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

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const role = admin.role;
    setLoggedInRole(role);
    getImages();
  }, []);

  const isCurrentRole =
    loggedInRole === "admin utama" || loggedInRole === "admin kedua";

  return (
    <AuthLayout title={"Images"}>
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold md:text-2xl">
          Hi, admin have a nice day
        </p>
        {isCurrentRole && (
          <Link to="/tambahImages">
            <i className="fas fa-plus text-black text-xl md:text-2xl"></i>
          </Link>
        )}
      </header>

      <section className="overflow-x-auto md:overflow-hidden md:w-full">
        <table className="md:w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2 text-center">Id</th>
              <th className="border border-black px-4 py-2 text-center">
                Images
              </th>
              <th className="border border-black px-4 py-2 text-center">
                Kategori
              </th>
              <th className="border border-black px-4 py-2 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataImages.map((item) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-100 text-center"
              >
                <td className="border border-black px-4 py-2 text-black">
                  {item.id}
                </td>
                <td className="border border-black px-4 py-2">
                  <img
                    src={`http://localhost:3000${item.image}`}
                    alt={item.product_name}
                    className="w-32 h-20 lg:w-full object-cover rounded-xl"
                  />
                </td>
                <td className="border border-black px-4 py-2 text-black">
                  {item.kategori}
                </td>
                <td className="border border-black px-4 py-2">
                  <div className="flex w-full gap-x-3">
                    {isCurrentRole ? (
                      <>
                        <Link
                          to={`/editimages/${item.id}`}
                          className="w-1/2 bg-white p-3 text-black rounded-lg text-center border border-black"
                        >
                          <button>Edit Gambar</button>
                        </Link>
                        <button
                          className="bg-red-700 rounded-lg p-3 text-white w-1/2 md:text-xl"
                          onClick={() => confirmDelete(item.id)}
                        >
                          Hapus Gambar
                        </button>
                      </>
                    ) : (
                      // Jika bukan admin utama, tampilkan tombol non-aktif
                      <>
                        <button
                          className="w-1/2 bg-gray-300 p-3 text-gray-500 rounded-lg text-center border border-gray-300 cursor-not-allowed"
                          disabled
                        >
                          Edit Gambar
                        </button>
                        <button
                          className="w-1/2 bg-gray-300 p-3 text-gray-500 rounded-lg text-center border border-gray-300 cursor-not-allowed"
                          disabled
                        >
                          Hapus Gambar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isDeletePopupOpen && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">
              Apakah anda yakin ingin menghapus Images ini?
            </h2>
            <div className="flex justify-center gap-5 md:text-xl">
              <button
                onClick={proceedDelete}
                className="text-white px-4 py-2 rounded-lg bg-red-700"
              >
                Ya, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-400"
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
            <h2 className="text-2xl font-semibold">Images has been deleted</h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default Images;
