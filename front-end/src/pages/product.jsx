import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../component/layouts/AuthLayout";

const Product = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [afterDelete, setAfterDelete] = useState(false);

  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/product");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      // Pastikan data product mengandung URL lengkap dari gambar
      setDataProduct(data.payload.datas);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/product/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting the product with id ${id}`);
      }

      // Refresh data setelah delete
      await getProduct();

      // Reset ID dan tutup popup setelah penghapusan
      setDeleteId(null);
      setIsDeletePopupOpen(false);
      setAfterDelete(true);
    } catch (err) {
      console.error("Error during deletion:", err.message);
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
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (afterDelete) {
      const timer = setTimeout(() => {
        setAfterDelete(false);
      }, 3000);
      return () => clearTimeout(timer); // Membersihkan timer jika komponen unmount
    }
  }, [afterDelete]);

  return (
    <AuthLayout title={"Product"}>
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold md:text-2xl">
          Hi, admin have a nice day
        </p>
        <Link to="/tambahproduct">
          <i className="fas fa-plus text-black text-xl md:text-2xl"></i>
        </Link>
      </header>

      <section className="flex flex-col gap-y-5 items-center">
        <div className="w-full flex flex-col gap-y-5 xl:grid xl:grid-cols-3 xl:gap-5">
          {dataProduct.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-l from-[#67BD5E] to-[#467840] rounded-xl p-3 flex flex-col text-white gap-y-3 h-fit"
            >
              <img
                src={`http://localhost:3000${item.image}`}
                alt={item.product_name}
                className="w-full h-96 object-cover rounded-xl"
              />
              <section className="flex justify-between">
                <div className="flex flex-col gap-y-3">
                  <p className="md:text-xl">{item.product_name}</p>
                  <p className="md:text-xl">{item.description}</p>
                </div>
                <div className="flex justify-between">
                  <p className="md:text-xl">Kategori: {item.kategori}</p>
                </div>
              </section>
              <div className="flex w-full gap-x-3">
                <>
                  <Link
                    to={`/editproduct/${item.id}`}
                    className="w-1/2 bg-white p-3 text-black rounded-lg text-center border border-black"
                  >
                    <button>Edit Produk</button>
                  </Link>
                  <button
                    className="bg-red-700 rounded-lg p-3 text-white w-1/2 md:text-xl"
                    onClick={() => confirmDelete(item.id)}
                  >
                    Hapus Produk
                  </button>
                </>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isDeletePopupOpen && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">
              Apakah anda yakin ingin menghapus Product ini?
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
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
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
            <h2 className="text-2xl font-semibold">Product has been deleted</h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default Product;
