import { useState, useEffect } from 'react'
import AuthLayout from '../component/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'

const TambahTeam = () => {
    const [dataForm, setDataForm] = useState({
        name: '',
        jabatan: '',
        email: '',
        no_telp: '',
        linkedin: '',
        instagram: '',
    })
    const [teamAdded, setteamAdded] = useState(false)
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
            const response = await fetch("http://localhost:3000/api/v1/team/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: dataForm.name,
                    jabatan: dataForm.jabatan,
                    email: dataForm.email,
                    no_telp: dataForm.no_telp,
                    linkedin: dataForm.linkedin,
                    instagram: dataForm.instagram,
                }),
            })
            const data = await response.json()
            if (response.ok) {
                setteamAdded(true)
                setTimeout(() => {
                    navigate('/team')  // Redirect menggunakan useNavigate
                }, 3000);  // Redirect setelah 3 detik
            } else {
                alert('Gagal Menambahkan Team');
                console.log(`Error: ${data.message}`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let timer;
        if (teamAdded) {
            timer = setTimeout(() => {
                setteamAdded(false);
            }, 3000);
        }
        return () => clearTimeout(timer); // Cleanup saat komponen tidak lagi di-render
    }, [teamAdded]);

    return (
        <AuthLayout>
            <section className='flex flex-col gap-y-5'>
                <h1 className='text-center text-2xl font-bold'>Tambah Team</h1>

                <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name" className="text-black font-bold">Nama</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Input your name" 
                            className="p-3 rounded-lg border-black border-2" 
                            value={dataForm.name} 
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
                            value={dataForm.jabatan} 
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
                            value={dataForm.email} 
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
                            value={dataForm.no_telp} 
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
                            value={dataForm.linkedin} 
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
                            value={dataForm.instagram} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <button className="bg-gradient-to-l from-[#67BD5E] to-[#467840] text-black p-3 rounded-lg w-full text-xl" type="submit">Submit</button>
                    </div>
                </form>
            </section>

            {teamAdded && (
                <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                    <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                        <h2 className="text-2xl font-semibold">Team telah ditambahkan</h2>
                        <i className="fas fa-check-circle text-5xl text-green-500"></i>
                    </div>
                </section>
            )}
        </AuthLayout>
    )
}

export default TambahTeam
