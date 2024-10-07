import { useState, useEffect } from 'react'
import AuthLayout from '../component/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'

const TambahArticle = () => {
    const [dataForm, setDataForm] = useState({
        title: '',
        description: '',
        content: '',
        kategori: ''
    })
    const [articleAdded, setArticleAdded] = useState(false)
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
            const response = await fetch("http://localhost:3000/api/v1/article/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: dataForm.title,
                    description: dataForm.description,
                    content: dataForm.content,
                    kategori: dataForm.kategori,
                }),
            })
            const data = await response.json()
            if (response.ok) {
                setArticleAdded(true)
                setTimeout(() => {
                    navigate('/article')  // Redirect menggunakan useNavigate
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
        if (articleAdded) {
            timer = setTimeout(() => {
                setArticleAdded(false);
            }, 3000);
        }
        return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
    }, [articleAdded]);

    return (
        <AuthLayout>
            <section className='flex flex-col gap-y-5'>
                <h1 className='text-center text-2xl font-bold'>Tambah Artikel</h1>

                <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="title" className="text-black font-bold">Judul Artikel</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            placeholder="Input your title" 
                            className="p-3 rounded-lg border-black border-2" 
                            value={dataForm.title} 
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
                        <label htmlFor="content" className="text-black font-bold">Isi Artikel</label>
                        <textarea 
                            name="content" 
                            id="content" 
                            placeholder="Input your content" 
                            className="p-3 rounded-lg border-black border-2" 
                            value={dataForm.content} 
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

            {articleAdded && (
                <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                    <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                        <h2 className="text-2xl font-semibold">Artikel telah ditambahkan</h2>
                        <i className="fas fa-check-circle text-5xl text-green-500"></i>
                    </div>
                </section>
            )}
        </AuthLayout>
    )
}

export default TambahArticle
