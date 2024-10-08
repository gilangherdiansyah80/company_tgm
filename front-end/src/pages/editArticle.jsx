import { useEffect, useState } from "react"
import AuthLayout from "../component/layouts/AuthLayout"
import { useParams, useNavigate } from "react-router-dom"

const EditArticle = () => {
    const [dataArticle, setdataArticle] = useState(null)
    const [updateArticle, setupdateArticle] = useState({
        title: '',
        description: '',
        content: '',
        kategori: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()

    const endPoint = `http://localhost:3000/api/v1/article/${id}`
    const endPointPut = `http://localhost:3000/api/v1/article/update/${id}`

    useEffect(() => {
        const getFetchData = async () => {
            const response = await fetch(endPoint)
            const data = await response.json()
            const articleData = data.payload.datas[0] // Ambil data pertama jika banyak
            setdataArticle(articleData)
            setupdateArticle({
                title: articleData.title || '',
                description: articleData.description || '',
                content: articleData.content || '',
                kategori: articleData.kategori || '',
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
            body: JSON.stringify(updateArticle)
        })

        if (response.ok) {
            alert('Data updated successfully!')
            navigate('/article') // Redirect ke halaman booking list setelah update berhasil
        } else {
            alert('Failed to update data')
        }
    }

    const handleChange = (e) => {
        setupdateArticle({
            ...updateArticle,
            [e.target.id]: e.target.value
        })
    }

    return (
        <AuthLayout>
            <section className="flex flex-col gap-y-5 items-center w-full">
                <h1 className="text-xl font-bold md:text-2xl">Edit Pesanan</h1>

                <div className="flex flex-col gap-y-3 w-full">
                    {dataArticle && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-2 md:text-xl">
                                <label htmlFor="title" className="text-black font-bold">Judul Artikel</label>
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
                                <label htmlFor="description" className="text-black font-bold">Description</label>
                                <textarea 
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
                                <label htmlFor="content" className="text-black font-bold">Isi Artikel</label>
                                <textarea 
                                    name="content" 
                                    id="content" 
                                    placeholder="Input your content" 
                                    className="p-3 rounded-lg border-black border-2" 
                                    value={updateArticle.content} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 md:text-xl">
                                <label htmlFor="kategori" className="text-black font-bold">kategori</label>
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

                            <div className="flex gap-x-3 w-full md:text-xl">
                                <button
                                    type="button"
                                    className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2"
                                    onClick={() => navigate('/article')}
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

export default EditArticle