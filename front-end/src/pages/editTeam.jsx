import { useEffect, useState } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useParams, useNavigate } from "react-router-dom";

const EditTeam = () => {
  const [dataArticle, setdataArticle] = useState(null);
  const [updateTeam, setupdateTeam] = useState({
    name: "",
    jabatan: "",
    email: "",
    no_telp: "",
    linkedin: "",
    instagram: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editImage, setEditImage] = useState(false);

  const endPoint = `http://localhost:3000/api/v1/team/${id}`;
  const endPointPut = `http://localhost:3000/api/v1/team/update/${id}`;

  useEffect(() => {
    const getFetchData = async () => {
      const response = await fetch(endPoint);
      const data = await response.json();
      const teamData = data.payload.datas[0]; // Ambil data pertama jika banyak
      setdataArticle(teamData);
      setupdateTeam({
        name: teamData.name || "",
        jabatan: teamData.jabatan || "",
        email: teamData.email || "",
        no_telp: teamData.no_telp || "",
        linkedin: teamData.linkedin || "",
        instagram: teamData.instagram || "",
        image: teamData.image || "",
      });
    };

    getFetchData();
  }, [id, endPoint]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setupdateTeam({
        ...updateTeam,
        image: URL.createObjectURL(file), // Tampilkan preview gambar yang dipilih
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updateTeam.name);
    formData.append("jabatan", updateTeam.jabatan);
    formData.append("email", updateTeam.email);
    formData.append("no_telp", updateTeam.no_telp);
    formData.append("linkedin", updateTeam.linkedin);
    formData.append("instagram", updateTeam.instagram);

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", updateTeam.image);
    }

    const response = await fetch(endPointPut, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("Data updated successfully!");
      navigate("/team"); // Redirect ke halaman booking list setelah update berhasil
    } else {
      alert("Failed to update data");
    }
  };

  const handleChange = (e) => {
    setupdateTeam({
      ...updateTeam,
      [e.target.id]: e.target.value,
    });
  };

  const handleEditImage = () => {
    setEditImage(!editImage);
  };

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5 items-center w-full">
        <h1 className="text-xl font-bold md:text-2xl">Edit Team</h1>

        <div className="flex flex-col gap-y-3 w-full md:text-xl">
          {dataArticle && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
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
                  value={updateTeam.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="image" className="text-black font-bold">
                  Nama
                </label>
                {updateTeam.image && (
                  <img
                    src={`http://localhost:3000${updateTeam.image}`}
                    alt="Current product"
                    className="w-32 h-32 object-cover mb-3"
                  />
                )}
                <button
                  type="button"
                  onClick={handleEditImage}
                  className="bg-gradient-to-l from-[#67BD5E] to-[#467840] text-white px-4 py-2 rounded-lg mb-3"
                >
                  {editImage ? "Batal Ubah Gambar" : "Ubah Gambar"}
                </button>
                {editImage && (
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="p-3 rounded-lg border-black border-2"
                    onChange={handleImageChange}
                  />
                )}
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
                  value={updateTeam.jabatan}
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
                  value={updateTeam.email}
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
                  value={updateTeam.no_telp}
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
                  value={updateTeam.linkedin}
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
                  value={updateTeam.instagram}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-x-3 w-full">
                <button
                  type="button"
                  className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2"
                  onClick={() => navigate("/team")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 px-5 py-2 rounded-lg text-white w-1/2"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </AuthLayout>
  );
};

export default EditTeam;
