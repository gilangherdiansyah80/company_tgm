import { useState, useEffect } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const TambahTeam = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    jabatan: "",
    email: "",
    no_telp: "",
    linkedin: "",
    instagram: "",
  });
  const [teamAdded, setteamAdded] = useState(false);
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
    formData.append("name", dataForm.name);
    formData.append("jabatan", dataForm.jabatan);
    formData.append("email", dataForm.email);
    formData.append("no_telp", dataForm.no_telp);
    formData.append("linkedin", dataForm.linkedin);
    formData.append("instagram", dataForm.instagram);
    if (imageFile) {
      formData.append("image", imageFile); // Tambahkan gambar ke formData
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/team/create", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setteamAdded(true);
        setTimeout(() => {
          navigate("/team"); // Redirect menggunakan useNavigate
        }, 3000); // Redirect setelah 3 detik
      } else {
        alert("Gagal Menambahkan Team");
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer;
    if (teamAdded) {
      timer = setTimeout(() => {
        setteamAdded(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
  }, [teamAdded]);

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5">
        <h1 className="text-center text-2xl font-bold">Tambah Team</h1>

        <form
          className="flex flex-col gap-y-5 md:text-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-black font-bold">
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Input your name"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="image" className="text-black font-bold">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="p-3 rounded-lg border-black border-2"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col gap-y-2">
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
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-black font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Input your email"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="no_telp" className="text-black font-bold">
              Whatsapp
            </label>
            <input
              type="number"
              name="no_telp"
              id="no_telp"
              placeholder="Input your number (ex: 628123456789)"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.no_telp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="linkedin" className="text-black font-bold">
              Linkedin
            </label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              placeholder="Input your linkedin"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.linkedin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="instagram" className="text-black font-bold">
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              id="instagram"
              placeholder="Input your instagram"
              className="p-3 rounded-lg border-black border-2"
              value={dataForm.instagram}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-x-3 w-full">
            <button
              type="button"
              className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2 md:text-xl"
              onClick={() => navigate("/team")}
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

      {teamAdded && (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
          <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
            <h2 className="text-2xl font-semibold">Team telah ditambahkan</h2>
            <i className="fas fa-check-circle text-5xl text-green-500"></i>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default TambahTeam;
