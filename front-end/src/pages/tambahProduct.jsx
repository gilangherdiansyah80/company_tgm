import { useState, useEffect } from 'react'
import AuthLayout from '../component/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'

const TambahProduct = () => {
    const [dataForm, setDataForm] = useState({
        product_name: '',
        description: '',
        stock: '',
        kategori: ''
    })
    const [productAdded, setproductAdded] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch("http://localhost:3000/api/v1/product/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_name: dataForm.product_name,
                    description: dataForm.description,
                    stock: dataForm.stock,
                    kategori: dataForm.kategori,
                }),
            })
            const data = await response.json()
            if (response.ok) {
                setproductAdded(true)
                setTimeout(() => {
                    navigate('/product')  // Redirect menggunakan useNavigate
                }, 3000);  // Redirect setelah 3 detik
            } else {
                alert('Gagal Menambahkan User');
                console.log(`Error: ${data.message}`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let timer;
        if (productAdded) {
            timer = setTimeout(() => {
                setproductAdded(false);
            }, 3000);
        }
        return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
    }, [productAdded]);

    return (
        <AuthLayout>
            <section className='flex flex-col gap-y-5'>
                <h1 className='text-center text-2xl font-bold'>Tambah Product</h1>

                <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="product_name" className="text-black font-bold">Product Name</label>
                        <input 
                            type="text" 
                            name="product_name" 
                            id="product_name" 
                            placeholder="Input your product_name" 
                            className="p-3 rounded-lg border-black border-2" 
                            value={dataForm.product_name} 
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
                            value={dataForm.description} 
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
                            value={dataForm.stok} 
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
                            value={dataForm.kategori} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <button className="bg-gradient-to-l from-[#67BD5E] to-[#467840] text-black p-3 rounded-lg w-full text-xl" type="submit">Submit</button>
                    </div>
                </form>
            </section>

            {productAdded && (
                <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                    <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                        <h2 className="text-2xl font-semibold">Product telah ditambahkan</h2>
                        <i className="fas fa-check-circle text-5xl text-green-500"></i>
                    </div>
                </section>
            )}
        </AuthLayout>
    )
}

export default TambahProduct
