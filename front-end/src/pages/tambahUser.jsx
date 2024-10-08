import { useState, useEffect } from 'react'
import AuthLayout from '../component/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'

const TambahUser = () => {
    const [dataForm, setDataForm] = useState({
        username: '',
        password: ''
    })
    const [userAdded, setUserAdded] = useState(false)
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
            const response = await fetch("http://localhost:3000/api/v1/admin/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: dataForm.username,
                    password: dataForm.password
                }),
            })
            const data = await response.json()
            if (response.ok) {
                setUserAdded(true)
                setTimeout(() => {
                    navigate('/users')  // Redirect menggunakan useNavigate
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
        if (userAdded) {
            timer = setTimeout(() => {
                setUserAdded(false);
            }, 3000);
        }
        return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
    }, [userAdded]);

    const handleOpenPassword = () => {
        const passwordInput = document.getElementById('password');
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }

    return (
        <AuthLayout>
            <section className='flex flex-col gap-y-5'>
                <h1 className='text-center text-2xl font-bold'>Tambah User</h1>

                <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="username" className="text-black font-bold md:text-xl">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Input your username" 
                            className="p-3 rounded-lg border-black border-2 md:text-xl" 
                            value={dataForm.username} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password" className="text-black font-bold md:text-xl">Password</label>
                        <div className="flex items-center relative">
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="*******" 
                                className="w-full  border-black border-2 p-3 rounded-lg md:text-xl" 
                                value={dataForm.password} 
                                onChange={handleChange} 
                                required 
                            />
                            <i 
                                className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-gray-500 md:text-xl" 
                                onClick={handleOpenPassword}
                            ></i>
                        </div>
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
                                    Submit
                                </button>
                            </div>
                </form>
            </section>

            {userAdded && (
                <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                    <div className="bg-white w-full md:w-4/5 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                        <h2 className="text-2xl font-semibold">User telah ditambahkan</h2>
                        <i className="fas fa-check-circle text-5xl text-green-500"></i>
                    </div>
                </section>
            )}
        </AuthLayout>
    )
}

export default TambahUser
