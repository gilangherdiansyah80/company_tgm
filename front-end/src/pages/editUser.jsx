import { useEffect, useState } from "react"
import AuthLayout from "../component/layouts/AuthLayout"
import { useParams, useNavigate } from "react-router-dom"

const EditUser = () => {
    const [dataUser, setdataUser] = useState(null)
    const [updateUser, setupdateUser] = useState({
        username: '',
        password: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()

    const endPoint = `http://localhost:3000/api/v1/admin/${id}`
    const endPointPut = `http://localhost:3000/api/v1/admin/update/${id}`

    useEffect(() => {
        const getFetchData = async () => {
            const response = await fetch(endPoint)
            const data = await response.json()
            const userData = data.payload.datas[0] // Ambil data pertama jika banyak
            setdataUser(userData)
            setupdateUser({
                username: userData.username || '',
                password: userData.password || ''
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
            body: JSON.stringify(updateUser)
        })

        if (response.ok) {
            alert('Data updated successfully!')
            navigate('/users') // Redirect ke halaman booking list setelah update berhasil
        } else {
            alert('Failed to update data')
        }
    }

    const handleChange = (e) => {
        setupdateUser({
            ...updateUser,
            [e.target.id]: e.target.value
        })
    }

    return (
        <AuthLayout>
            <section className="flex flex-col gap-y-5 items-center w-full">
                <h1 className="text-xl font-bold">Edit Pesanan</h1>

                <div className="flex flex-col gap-y-3 w-full">
                    {dataUser && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="username" className="font-bold md:text-xl">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={handleChange}
                                    className="border-black border-2 rounded-md p-2 md:text-xl"
                                    value={updateUser.username}
                                />
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="time_start" className="md:text-xl">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    className="border-black border-2 rounded-md p-2 md:text-xl"
                                />
                            </div>

                            <div className="flex gap-x-3 w-full">
                                <button
                                    type="button"
                                    className="bg-red-500 px-5 py-2 md:px-6 md:py-4 rounded-lg text-white w-1/2 md:text-xl"
                                    onClick={() => navigate('/users')}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 px-5 py-2 rounded-lg text-white w-1/2 md:text-xl">
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

export default EditUser