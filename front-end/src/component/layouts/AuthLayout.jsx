import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Home = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const navigate = useNavigate()

    const handleOpen = () => {
        setIsOpen(!isOpen)
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLogout = () => {
        navigate('/')
    }
    return (
        <div className="bg-gradient-to-l from-[#67BD5E] to-[#467840] p-3 flex flex-col gap-y-10 min-h-screen">
            <aside className="p-3">
                <header className="flex justify-between items-center">
                    <div>
                        {isOpen ? (
                            <i className="fas fa-times text-white text-xl md:text-2xl" onClick={handleOpen}></i>
                        ) : (
                            <i className="fas fa-bars text-white text-xl md:text-2xl" onClick={handleOpen}></i>
                        )}
                    </div>

                    <button className="bg-red-700 p-3 md:px-5 md:py-4 rounded-xl text-white md:text-xl" onClick={handleLogout}>Logout</button>
                </header>

                {/* Sidebar for Mobile Device and Tablet Device */}
                {isOpen && (
                    <nav className="min-h-screen flex flex-col bg-ejp justify-center items-center mt-10 md:mt-0 gap-y-10">
                        <div className="flex flex-col justify-between items-center">
                            <div className="-mt-14 flex flex-col gap-y-2 justify-center items-center">
                                <div className="border-2 rounded-full w-12 h-12 md:w-20 md:h-20 flex justify-center items-center">
                                    <i className="fas fa-user text-white text-2xl md:text-5xl"></i>
                                </div>
                                <h1 className="text-white font-bold text-xl md:text-2xl">Admin</h1>
                            </div>
                        </div>
                        <ul className="w-full flex flex-col gap-y-5 justify-center items-center">
                            <Link to='/home' className={`text-xl p-3 text-white w-full ${location.pathname === '/home' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center md:text-2xl`}>
                                    <i className={`fas fa-home ${location.pathname === '/home' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/home' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Home</p>
                                </li>
                            </Link>
                            <Link to='/users' className={`text-xl p-3 text-white w-full ${location.pathname === '/users' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center md:text-2xl`}>
                                    <i className={`fas fa-users ${location.pathname === '/users' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/users' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>User</p>
                                </li>
                            </Link>
                            <Link to='/product' className={`text-xl p-3 text-white w-full ${location.pathname === '/product' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center md:text-2xl`}>
                                    <i className={`fas fa-shopping-cart ${location.pathname === '/product' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/product' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Product</p>
                                </li>
                            </Link>
                            <Link to='/article' className={`text-xl p-3 text-white w-full ${location.pathname === '/article' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center md:text-2xl`}>
                                    <i className={`fas fa-newspaper ${location.pathname === '/article' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/article' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Artikel</p>
                                </li>
                            </Link>
                            <Link to='/testimoni' className={`text-xl p-3 text-white w-full ${location.pathname === '/testimoni' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center md:text-2xl`}>
                                    <i className={`fas fa-star ${location.pathname === '/testimoni' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/testimoni' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Testimoni</p>
                                </li>
                            </Link>
                            <Link to='/about' className={`text-xl p-3 text-white w-full ${location.pathname === '/about' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center md:text-2xl`}>
                                    <i className={`fas fa-tags ${location.pathname === '/about' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/about' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Tentang Kami</p>
                                </li>
                            </Link>
                            <Link to='/team' className={`text-xl p-3 text-white w-full ${location.pathname === '/team' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center md:text-2xl`}>
                                    <i className={`fas fa-users ${location.pathname === '/team' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/team' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Team</p>
                                </li>
                            </Link>
                        </ul>
                    </nav>
                )}
            </aside>

            {isMenuOpen && (
                <main className="bg-white p-3 rounded-md flex flex-col gap-y-10">
                    {children}
                </main>
            )}
        </div>
    )
}

export default Home;