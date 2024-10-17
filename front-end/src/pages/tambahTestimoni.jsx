import { useState, useEffect } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const TambahTestimoni = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    jabatan: "",
    description: "",
  });
  const [testimoniAdded, settestimoniAdded] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", dataForm.username);
    formData.append("jabatan", dataForm.jabatan);
    formData.append("description", dataForm.description);
    if (imageFile) {
      formData.append("image", imageFile); // Tambahkan gambar ke formData
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/testimoni/create",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        settestimoniAdded(true);
        setTimeout(() => {
          navigate("/testimoni"); // Redirect menggunakan useNavigate
        }, 3000); // Redirect setelah 3 detik
      } else {
        alert("Gagal Menambahkan User");
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer;
    if (testimoniAdded) {
      timer = setTimeout(() => {
        settestimoniAdded(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
  }, [testimoniAdded]);

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5">
        <h1 className="text-center text-2xl font-bold">Tambah Testimoni</h1>

        <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2 md:text-xl">
            <label htmlFor="username" className="text-black font-bold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Input your username"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2 md:text-xl">
            <label htmlFor="image" className="text-black font-bold">
              Upload Gambar
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="p-3 rounded-lg border-black border-2"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 md:text-xl">
            <label htmlFor="jabatan" className="text-black font-bold">
              Jabatan
            </label>
            <input
              type="text"
              name="jabatan"
              id="jabatan"
              placeholder="Input your jabatan"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.jabatan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2 md:text-xl">
            <label htmlFor="description" className="text-black font-bold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Input your description"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-x-3 w-full">
            <button
              type="button"
              className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2 md:text-xl"
              onClick={() => navigate("/testimoni")}
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

      {testimoniAdded && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">
              Testimoni telah ditambahkan
            </h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default TambahTestimoni;
