import { useState, useEffect } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const TambahProduct = () => {
  const [dataForm, setDataForm] = useState({
    product_name: "",
    description: "",
    kategori: "",
  });
  const [imageFile, setImageFile] = useState(null); // Tambahkan state untuk gambar
  const [productAdded, setProductAdded] = useState(false);
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
    formData.append("product_name", dataForm.product_name);
    formData.append("description", dataForm.description);
    formData.append("kategori", dataForm.kategori);
    if (imageFile) {
      formData.append("image", imageFile); // Tambahkan gambar ke formData
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/product/create",
        {
          method: "POST",
          body: formData, // Kirim formData
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProductAdded(true);
        setTimeout(() => {
          navigate("/product"); // Redirect menggunakan useNavigate
        }, 3000); // Redirect setelah 3 detik
      } else {
        alert("Gagal Menambahkan Product");
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer;
    if (productAdded) {
      timer = setTimeout(() => {
        setProductAdded(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
  }, [productAdded]);

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5">
        <h1 className="text-center text-2xl font-bold">Tambah Product</h1>

        <form
          className="flex flex-col gap-y-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="product_name"
              className="text-black font-bold md:text-xl"
            >
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              placeholder="Input your product name"
              className="p-3 rounded-lg border-black border-2 md:text-xl"
              value={dataForm.product_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="description"
              className="text-black font-bold md:text-xl"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Input your description"
              className="p-3 rounded-lg border-black border-2 md:text-xl"
              value={dataForm.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="kategori"
              className="text-black font-bold md:text-xl"
            >
              Kategori
            </label>
            <input
              type="text"
              name="kategori"
              id="kategori"
              placeholder="Input your kategori"
              className="p-3 rounded-lg border-black border-2 md:text-xl"
              value={dataForm.kategori}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="image" className="text-black font-bold md:text-xl">
              Upload Gambar
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="p-3 rounded-lg border-black border-2 md:text-xl"
              onChange={handleImageChange} // Handle perubahan gambar
            />
          </div>
          <div className="flex gap-x-3 w-full">
            <button
              type="button"
              className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2 md:text-xl"
              onClick={() => navigate("/product")}
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

      {productAdded && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">
              Product telah ditambahkan
            </h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default TambahProduct;
