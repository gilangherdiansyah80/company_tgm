import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../component/layouts/AuthLayout";

const Article = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [afterDelete, setAfterDelete] = useState(false);

  const getArticle = async () => {
    const response = await fetch("http://localhost:3000/api/v1/article");
    const data = await response.json();
    setDataArticle(data.payload.datas);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/article/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting the booking with id ${id}`);
      }

      // Refresh data setelah delete
      getArticle();

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
    getArticle();
  }, []);

  const stripHTML = (html, length) => {
    const tempP = document.createElement("p");
    tempP.innerHTML = html;
    const text = tempP.textContent || tempP.innerText || "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <AuthLayout title={"Article"}>
      <header className="flex justify-between items-center">
        <p className="text-xl font-semibold md:text-2xl">
          Hi, admin have a nice day
        </p>
        <Link to="/tambahArticle">
          <i className="fas fa-plus text-black text-xl md:text-2xl"></i>
        </Link>
      </header>

      <section className="flex flex-col gap-y-5 items-center">
        <div className="w-full flex flex-col gap-y-5 xl:grid xl:grid-cols-3 xl:gap-5">
          {dataArticle.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-l from-[#67BD5E] to-[#467840] rounded-xl p-3 flex flex-col text-white gap-y-3 md:text-xl h-fit"
            >
              <img
                src={`http://localhost:3000${item.image}`}
                alt={item.title}
                className="w-full h-96 bg-center object-cover rounded-xl"
              />
              <article className="flex justify-between">
                <p>{item.title}</p>
                <p>Author : {item.author}</p>
              </article>
              <article>
                <p>Deskripsi :</p>
                <p>{item.description}</p>
              </article>
              <article>
                <p>Isi Artikel :</p>
                <div>{stripHTML(item.content, 156)}</div>
              </article>

              <div className="flex justify-between">
                <p>Create : {item.create_at.slice(0, 10)}</p>
                <p>Kategori : {item.kategori}</p>
              </div>
              <div className="flex w-full gap-x-3">
                <>
                  <Link
                    to={`/editarticle/${item.id}`}
                    className="w-1/2 bg-white p-3 text-black rounded-lg text-center border border-black"
                  >
                    <button>Edit Artikel</button>
                  </Link>
                  <button
                    className="bg-red-700 rounded-lg p-3 text-white w-1/2 md:text-xl"
                    onClick={() => confirmDelete(item.id)}
                  >
                    Hapus Artikel
                  </button>
                </>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isDeletePopupOpen && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">
              Apakah anda yakin ingin menghapus Article ini?
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
          <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">Article has been deleted</h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default Article;
