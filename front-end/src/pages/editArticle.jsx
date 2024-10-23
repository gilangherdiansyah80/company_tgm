import { useEffect, useState } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditArticle = () => {
  const [dataArticle, setdataArticle] = useState(null);
  const [updateArticle, setupdateArticle] = useState({
    title: "",
    description: "",
    content: "",
    kategori: "",
    author: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const endPoint = `http://localhost:3000/api/v1/article/${id}`;
  const endPointPut = `http://localhost:3000/api/v1/article/update/${id}`;

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const response = await fetch(endPoint);
        if (!response.ok) throw new Error("Failed to fetch article data");
        const data = await response.json();
        const articleData = data.payload.datas[0]; // Ambil data pertama jika banyak
        setdataArticle(articleData);
        setupdateArticle({
          title: articleData.title || "",
          description: articleData.description || "",
          content: articleData.content || "",
          kategori: articleData.kategori || "",
          author: articleData.author || "",
        });
      } catch (error) {
        console.error(error);
        alert("Error fetching article data: " + error.message);
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
    formData.append("title", updateArticle.title);
    formData.append("description", updateArticle.description);
    formData.append("content", updateArticle.content);
    formData.append("kategori", updateArticle.kategori);
    formData.append("author", updateArticle.author);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(endPointPut, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update article");
      alert("Data updated successfully!");
      navigate("/article"); // Redirect ke halaman article list setelah update berhasil
    } catch (error) {
      console.error(error);
      alert("Error updating data: " + error.message);
    }
  };

  const handleChange = (e) => {
    setupdateArticle({
      ...updateArticle,
      [e.target.id]: e.target.value,
    });
  };

  const handleQuillChange = (value) => {
    setupdateArticle({
      ...updateArticle,
      content: value, // Menangani perubahan konten dari ReactQuill
    });
  };

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5 items-center w-full">
        <h1 className="text-xl font-bold md:text-2xl">Edit Artikel</h1>

        <div className="flex flex-col gap-y-3 w-full">
          {dataArticle && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="title" className="text-black font-bold">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Input your title"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateArticle.title}
                  onChange={handleChange}
                  required
                />
              </div>
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
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="description" className="text-black font-bold">
                  Deskripsi
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Input your description"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateArticle.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="content" className="text-black font-bold">
                  Isi Artikel
                </label>
                <ReactQuill
                  id="content"
                  theme="snow"
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline"],
                      ["link", "image"],
                      [{ header: 1 }, { header: 2 }], // custom button values
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { list: "check" },
                      ],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "link",
                    "image",
                    "list",
                  ]} // Pastikan 'list' ada
                  value={updateArticle.content}
                  onChange={handleQuillChange} // Menggunakan fungsi penanganan perubahan yang sesuai
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="kategori" className="text-black font-bold">
                  Kategori
                </label>
                <input
                  type="text"
                  name="kategori"
                  id="kategori"
                  placeholder="Input your kategori"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateArticle.kategori}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="author" className="text-black font-bold">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Input your author"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateArticle.author}
                  onChange={handleChange}
                  required
                />
              </div>

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

export default EditArticle;
