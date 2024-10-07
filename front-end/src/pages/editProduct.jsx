import { useEffect, useState } from "react"
import AuthLayout from "../component/layouts/AuthLayout"
import { useParams, useNavigate } from "react-router-dom"

const EditProduct = () => {
    const [dataProduct, setdataProduct] = useState(null)
    const [updateProduct, setupdateProduct] = useState({
        product_name: '',
        description: '',
        stock: '',
        kategori: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()

    const endPoint = `http://localhost:3000/api/v1/product/${id}`
    const endPointPut = `http://localhost:3000/api/v1/product/update/${id}`

    useEffect(() => {
        const getFetchData = async () => {
            const response = await fetch(endPoint)
            const data = await response.json()
            const productData = data.payload.datas[0] // Ambil data pertama jika banyak
            setdataProduct(productData)
            setupdateProduct({
                product_name: productData.product_name || '',
                description: productData.description || '',
                stock: productData.stock || '',
                kategori: productData.kategori || '',
            })
        }

        getFetchData()
    }, [id, endPoint])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(endPointPut, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateProduct)
        })

        if (response.ok) {
            alert('Data updated successfully!')
            navigate('/product') // Redirect ke halaman booking list setelah update berhasil
        } else {
            alert('Failed to update data')
        }
    }

    const handleChange = (e) => {
        setupdateProduct({
            ...updateProduct,
            [e.target.id]: e.target.value
        })
    }

    return (
        <AuthLayout>
            <header className="flex justify-between items-center">
                <p className="text-xl font-semibold">Hi, admin have a nice day</p>
                <i className="fas fa-user text-black text-xl"></i>
            </header>

            <section className="flex flex-col gap-y-5 items-center w-full">
                <h1 className="text-xl font-bold">Edit Pesanan</h1>

                <div className="flex flex-col gap-y-3 w-full">
                    {dataProduct && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="product_name" className="text-black font-bold">Product Name</label>
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
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="description" className="text-black font-bold">Description</label>
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
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="stock" className="text-black font-bold">Stok</label>
                                <input 
                                    type="number" 
                                    name="stock" 
                                    id="stock" 
                                    placeholder="Input your stock" 
                                    className="p-3 rounded-lg border-black border-2" 
                                    value={updateProduct.stock} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="kategori" className="text-black font-bold">kategori</label>
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

                            <div className="flex gap-x-3 w-full">
                                <button
                                    type="button"
                                    className="bg-red-500 px-5 py-2 rounded-lg text-white w-1/2"
                                    onClick={() => navigate('/product')}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 px-5 py-2 rounded-lg text-white w-1/2">
                                    Save
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </AuthLayout>
    )
}

export default EditProduct