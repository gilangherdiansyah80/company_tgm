import { useEffect, useState } from "react"
import AuthLayout from "../component/layouts/AuthLayout"
import { useParams, useNavigate } from "react-router-dom"

const EditTeam = () => {
    const [dataArticle, setdataArticle] = useState(null)
    const [updateTeam, setupdateTeam] = useState({
        name: '',
        jabatan: '',
        email: '',
        no_telp: '',
        linkedin: '',
        instagram: '',
    })
    const { id } = useParams()
    const navigate = useNavigate()

    const endPoint = `http://localhost:3000/api/v1/team/${id}`
    const endPointPut = `http://localhost:3000/api/v1/team/update/${id}`

    useEffect(() => {
        const getFetchData = async () => {
            const response = await fetch(endPoint)
            const data = await response.json()
            const teamData = data.payload.datas[0] // Ambil data pertama jika banyak
            setdataArticle(teamData)
            setupdateTeam({
                name: teamData.name || '',
                jabatan: teamData.jabatan || '',
                email: teamData.email || '',
                no_telp: teamData.no_telp || '',
                linkedin: teamData.linkedin || '',
                instagram: teamData.instagram || '',
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
            body: JSON.stringify(updateTeam)
        })

        if (response.ok) {
            alert('Data updated successfully!')
            navigate('/team') // Redirect ke halaman booking list setelah update berhasil
        } else {
            alert('Failed to update data')
        }
    }

    const handleChange = (e) => {
        setupdateTeam({
            ...updateTeam,
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
                <h1 className="text-xl font-bold">Edit Team</h1>

                <div className="flex flex-col gap-y-3 w-full">
                    {dataArticle && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="name" className="text-black font-bold">Nama</label>
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
                                <label htmlFor="jabatan" className="text-black font-bold">Jabatan</label>
                                <input
                                    type='text' 
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
                                <label htmlFor="email" className="text-black font-bold">Email</label>
                                <input
                                    type='email'
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
                                <label htmlFor="no_telp" className="text-black font-bold">Whatsapp</label>
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
                                <label htmlFor="linkedin" className="text-black font-bold">Linkedin</label>
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
                                <label htmlFor="instagram" className="text-black font-bold">Instagram</label>
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
                                    className="bg-red-500 px-5 py-2 rounded-lg text-white w-1/2"
                                    onClick={() => navigate('/team')}
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

export default EditTeam