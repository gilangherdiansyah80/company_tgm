import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../component/layouts/AuthLayout'

const Product = () => {
    const [dataProduct, setDataProduct] = useState([])
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [afterDelete, setAfterDelete] = useState(false)

    const getProduct = async () => {
        const response = await fetch('http://localhost:3000/api/v1/product')
        const data = await response.json()
        setDataProduct(data.payload.datas)
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/product/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error deleting the booking with id ${id}`);
            }

            // Refresh data setelah delete
            getProduct();

            // Reset ID dan tutup popup setelah penghapusan
            setDeleteId(null);
            setIsDeletePopupOpen(false);

        } catch (err) {
            console.error("Error during deletion:", err.message || err);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeletePopupOpen(true);  // Buka popup untuk konfirmasi
    };

    const cancelDelete = () => {
        setDeleteId(null);  // Reset ID jika penghapusan dibatalkan
        setIsDeletePopupOpen(false);  // Tutup popup
    };

    const proceedDelete = () => {
        if (deleteId) {
            handleDelete(deleteId);  // Lakukan penghapusan
            setAfterDelete(true);
        }
    };

    setTimeout(() => {
        if (afterDelete) {
            setAfterDelete(false);
        }
    }, 3000);

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <AuthLayout>
            <header className="flex justify-between items-center">
                    <p className="text-xl font-semibold md:text-2xl">Hi, admin have a nice day</p>
                    <Link to="/tambahproduct">
                        <i className="fas fa-plus text-black text-xl md:text-2xl"></i>
                    </Link>
                </header>

                <section className="flex flex-col gap-y-5 items-center">
                    <h1 className="text-xl font-bold md:text-2xl">Product</h1>

                    <div className='w-full flex flex-col gap-y-5 md:grid md:grid-cols-2 md:gap-x-5'>
                        {dataProduct.map((item, index) => (
                            <div key={item.id} className='bg-gradient-to-l from-[#67BD5E] to-[#467840] rounded-xl p-3 flex flex-col text-white gap-y-3'>
                                <h2 className='text-center text-2xl font-bold'>Product #{index + 1}</h2>
                                <p className='md:text-xl'>{item.product_name}</p>
                                <p className='md:text-xl'>{item.description}</p>
                                <div className='flex justify-between'>
                                    <p className="md:text-xl">Stok : {item.stock}</p>
                                    <p className='md:text-xl'>Kategori : {item.kategori}</p>
                                </div>
                                <div className='flex w-full gap-x-3'>
                                    <Link to={`/editproduct/${item.id}`} className='w-1/2 bg-white p-3 text-black rounded-lg text-center md:text-xl'>
                                        <button>Edit Product</button>
                                    </Link>
                                    <button
                                        className="bg-red-700 rounded-lg p-3 text-white w-1/2 md:text-xl"
                                        onClick={() => confirmDelete(item.id)}
                                    >
                                        Hapus Product
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {isDeletePopupOpen && (
                    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                        <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                            <h2 className="text-2xl font-semibold">Apakah anda yakin ingin menghapus Product ini?</h2>
                            <div className="flex justify-center gap-5 md:text-xl">
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
                        <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                            <h2 className="text-2xl font-semibold">Product has been deleted</h2>
                            <i className="fas fa-check-circle text-5xl text-green-500"></i>
                        </div>
                    </section>
                )}
        </AuthLayout>
    )
}

export default Product