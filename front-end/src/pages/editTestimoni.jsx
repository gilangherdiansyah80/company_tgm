import { useEffect, useState } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useParams, useNavigate } from "react-router-dom";

const EditTestimoni = () => {
  const [dataTestimoni, setdataTestimoni] = useState(null);
  const [updateTestimoni, setupdateTestimoni] = useState({
    username: "",
    description: "",
    jabatan: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const endPoint = `http://localhost:3000/api/v1/testimoni/${id}`;
  const endPointPut = `http://localhost:3000/api/v1/testimoni/update/${id}`;

  useEffect(() => {
    const getFetchData = async () => {
      const response = await fetch(endPoint);
      const data = await response.json();
      const testimoniData = data.payload.datas[0]; // Ambil data pertama jika banyak
      setdataTestimoni(testimoniData);
      setupdateTestimoni({
        username: testimoniData.username || "",
        description: testimoniData.description || "",
        jabatan: testimoniData.jabatan || "",
      });
    };

    getFetchData();
  }, [id, endPoint]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", updateTestimoni.username);
    formData.append("description", updateTestimoni.description);
    formData.append("jabatan", updateTestimoni.jabatan);
    if (imageFile) {
      formData.append("image", imageFile); // Tambahkan gambar ke formData
    }

    const response = await fetch(endPointPut, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("Data updated successfully!");
      navigate("/testimoni"); // Redirect ke halaman booking list setelah update berhasil
    } else {
      alert("Failed to update data");
    }
  };

  const handleChange = (e) => {
    setupdateTestimoni({
      ...updateTestimoni,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5 items-center w-full">
        <h1 className="text-xl font-bold md:text-2xl">Edit Testimoni</h1>

        <div className="flex flex-col gap-y-3 w-full">
          {dataTestimoni && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
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
                  value={updateTestimoni.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="image" className="text-black font-bold">
                  Ubah Gambar
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
                <label htmlFor="description" className="text-black font-bold">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Input your description"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateTestimoni.description}
                  onChange={handleChange}
                  required
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
                  value={updateTestimoni.jabatan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-x-3 w-full md:text-xl">
                <button
                  type="button"
                  className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2"
                  onClick={() => navigate("/testimoni")}
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

export default EditTestimoni;
