import { useState, useEffect } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const TambahImages = () => {
  const [dataForm, setDataForm] = useState({
    kategori: "",
  });
  const [imagesAdded, setImagesAdded] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Menyimpan file gambar yang di-upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("kategori", dataForm.kategori);
    if (imageFile) {
      formData.append("image", imageFile); // Tambahkan gambar ke formData
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/images/create",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setImagesAdded(true);
        setTimeout(() => {
          navigate("/images"); // Redirect setelah 3 detik
        }, 3000);
      } else {
        alert(`Gagal Menambahkan Images: ${data.message}`);
        console.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambahkan images.");
    }
  };

  useEffect(() => {
    let timer;
    if (imagesAdded) {
      timer = setTimeout(() => {
        setImagesAdded(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
  }, [imagesAdded]);

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5">
        <h1 className="text-center text-2xl font-bold">Tambah Artikel</h1>

        <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2 md:text-xl">
            <label htmlFor="image" className="text-black font-bold">
              Upload Gambar
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              placeholder="Input your title"
              className="p-3 rounded-lg border-black border-2"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 md:text-xl">
            <label htmlFor="kategori" className="text-black font-bold">
              Kategori
            </label>
            <select
              name="kategori"
              id="kategori"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.kategori}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="iklan">Iklan</option>
              <option value="banner">Banner</option>
              <option value="pop up">Pop Up</option>
              <option value="kolaborasi">Kolaborasi</option>
            </select>
          </div>
          <div className="flex gap-x-3 w-full">
            <button
              type="button"
              className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2 md:text-xl"
              onClick={() => navigate("/images")}
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

      {imagesAdded && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">
              Artikel telah ditambahkan
            </h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default TambahImages;
