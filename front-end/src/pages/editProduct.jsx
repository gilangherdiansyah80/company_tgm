import { useEffect, useState } from "react";
import AuthLayout from "../component/layouts/AuthLayout";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [dataProduct, setdataProduct] = useState(null);
  const [updateProduct, setupdateProduct] = useState({
    product_name: "",
    description: "",
    kategori: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false); // State untuk mengontrol input file
  const { id } = useParams();
  const navigate = useNavigate();

  const endPoint = `http://localhost:3000/api/v1/product/${id}`;
  const endPointPut = `http://localhost:3000/api/v1/product/update/${id}`;

  useEffect(() => {
    const getFetchData = async () => {
      const response = await fetch(endPoint);
      const data = await response.json();
      const productData = data.payload.datas[0];
      setdataProduct(productData);
      setupdateProduct({
        product_name: productData.product_name || "",
        description: productData.description || "",
        kategori: productData.kategori || "",
        image: productData.image || "",
      });
    };

    getFetchData();
  }, [id, endPoint]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setupdateProduct({
        ...updateProduct,
        image: URL.createObjectURL(file), // Tampilkan preview gambar yang dipilih
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", updateProduct.product_name);
    formData.append("description", updateProduct.description);
    formData.append("kategori", updateProduct.kategori);
    if (imageFile) {
      formData.append("image", imageFile); // Gunakan file baru jika dipilih
    } else {
      formData.append("image", updateProduct.image); // Gunakan gambar yang ada di database jika tidak ada file baru
    }

    const response = await fetch(endPointPut, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("Data updated successfully!");
      navigate("/product");
    } else {
      alert("Failed to update data");
    }
  };

  const handleChange = (e) => {
    setupdateProduct({
      ...updateProduct,
      [e.target.id]: e.target.value,
    });
  };

  const toggleEditImage = () => {
    setIsEditingImage(!isEditingImage); // Ubah status pengeditan gambar
  };

  return (
    <AuthLayout>
      <section className="flex flex-col gap-y-5 items-center w-full">
        <h1 className="text-xl font-bold md:text-2xl">Edit Pesanan</h1>

        <div className="flex flex-col gap-y-3 w-full">
          {dataProduct && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="product_name" className="text-black font-bold">
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  placeholder="Input your product_name"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateProduct.product_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="image" className="text-black font-bold">
                  Gambar Produk
                </label>
                {updateProduct.image && (
                  <img
                    src={`http://localhost:3000${updateProduct.image}`}
                    alt="Current product"
                    className="w-32 h-32 object-cover mb-3"
                  />
                )}
                <button
                  type="button"
                  onClick={toggleEditImage}
                  className="bg-gradient-to-l from-[#67BD5E] to-[#467840] text-white px-4 py-2 rounded-lg mb-3"
                >
                  {isEditingImage ? "Batal Ubah Gambar" : "Ubah Gambar"}
                </button>
                {isEditingImage && (
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
              <div className="flex flex-col gap-y-2 md:text-xl">
                <label htmlFor="description" className="text-black font-bold">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Input your description"
                  className="p-3 rounded-lg border-black border-2"
                  value={updateProduct.description}
                  onChange={handleChange}
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
                  value={updateProduct.kategori}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-x-3 w-full md:text-xl">
                <button
                  type="button"
                  className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2"
                  onClick={() => navigate("/product")}
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

export default EditProduct;
