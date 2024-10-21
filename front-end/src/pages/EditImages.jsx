import { useEffect, useState } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useParams, useNavigate } from "react-router-dom";

const EditImages = () => {
  const [dataImages, setdataImages] = useState(null);
  const [updateImages, setupdateImages] = useState({
    kategori: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const endPoint = `http://localhost:3000/api/v1/images/${id}`;
  const endPointPut = `http://localhost:3000/api/v1/images/update/${id}`;

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const response = await fetch(endPoint);
        if (!response.ok) throw new Error("Failed to fetch images data");
        const data = await response.json();
        const imagesData = data.payload.datas[0]; // Ambil data pertama jika banyak
        setdataImages(imagesData);
        setupdateImages({
          images: imagesData.images || "",
        });
      } catch (error) {
        console.error(error);
        alert("Error fetching images data: " + error.message);
      }
    };

    getFetchData();
  }, [id, endPoint]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("kategori", updateImages.kategori);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(endPointPut, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update images");
      alert("Data updated successfully!");
      navigate("/images"); // Redirect ke halaman images list setelah update berhasil
    } catch (error) {
      console.error(error);
      alert("Error updating data: " + error.message);
    }
  };

  const handleChange = (e) => {
    setupdateImages({
      ...updateImages,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5 items-center w-full">
        <h1 className="text-xl font-bold md:text-2xl">Edit Artikel</h1>

        <div className="flex flex-col gap-y-3 w-full">
          {dataImages && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="image" className="text-black font-bold">
                  Ganti Gambar
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Input your title"
                  className="p-3 rounded-lg border-black border-2"
                  onChange={handleImageChange}
                />
              </div>
              <select
                name="kategori"
                id="kategori"
                className="p-3 rounded-lg border-black border-2"
                value={updateImages.kategori}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Kategori</option>
                <option value="iklan">Iklan</option>
                <option value="banner">Banner</option>
                <option value="pop up">Pop Up</option>
                <option value="kolaborasi">Kolaborasi</option>
              </select>

              <div className="flex gap-x-3 w-full md:text-xl">
                <button
                  type="button"
                  className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2"
                  onClick={() => navigate("/article")}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-green-500 px-5 py-2 rounded-lg text-white w-1/2"
                >
                  Simpan
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </AuthLayout>
  );
};

export default EditImages;
