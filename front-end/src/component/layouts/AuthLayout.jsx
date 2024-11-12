import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get features from localStorage and map to an array of feature names
  const fitur = JSON.parse(localStorage.getItem("fitur")) || [];
  const adminFitur = fitur.map((item) => item.nama_fitur); // Extract nama_fitur

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCard = () => {
    setIsLogout(!isLogout);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("admin");
    localStorage.removeItem("fitur");
  };

  const menuItems = [
    { name: "Home", path: "/home", icon: "fa-home", nama_fitur: "Home" },
    { name: "Users", path: "/users", icon: "fa-users", nama_fitur: "users" },
    {
      name: "Product",
      path: "/product",
      icon: "fa-shopping-cart",
      nama_fitur: "Product",
    },
    {
      name: "Artikel",
      path: "/article",
      icon: "fa-newspaper",
      nama_fitur: "Article",
    },
    {
      name: "Testimoni",
      path: "/testimoni",
      icon: "fa-star",
      nama_fitur: "Testimoni",
    },
    {
      name: "Tentang Kami",
      path: "/about",
      icon: "fa-tags",
      nama_fitur: "About",
    },
    { name: "Team", path: "/team", icon: "fa-users", nama_fitur: "Team" },
    {
      name: "Images",
      path: "/images",
      icon: "fa-images",
      nama_fitur: "Images",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex w-full">
      {/* Sidebar */}
      <aside
        className={`text-white bg-gradient-to-l from-[#67BD5E] to-[#467840] p-3 flex flex-col gap-y-5 md:gap-y-20 fixed h-screen duration-700 md:rounded-e-3xl ${
          isOpen ? "block md:w-[80px]" : "hidden md:block w-full md:w-[240px]"
        }`}
      >
        <section className="flex flex-col justify-center gap-y-3">
          <i
            className="fas fa-times md:hidden text-2xl cursor-pointer"
            onClick={handleOpen}
          ></i>
          <div
            className={`flex justify-center items-center bg-white rounded-full self-center md:mt-10 ${
              isOpen ? "w-16 h-16" : "w-20 h-20"
            }`}
          >
            <img
              src="/images/logo.png"
              alt="Company TGM"
              className={`${isOpen ? "w-11 h-11" : "w-[60px] h-[50px]"}`}
            />
          </div>
          <h1
            className={`text-2xl font-bold text-center ${
              isOpen ? "hidden" : "block"
            }`}
          >
            Company TGM
          </h1>
        </section>

        {/* Filter menu based on features owned */}
        <nav className={`flex flex-col w-3/6 ${isOpen ? "" : "mt-20"}`}>
          <ul className="w-full flex flex-col gap-y-5">
            {menuItems.map(
              (item) =>
                (item.nama_fitur === "users" ||
                  adminFitur.includes(item.nama_fitur)) && (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                      location.pathname === item.path
                        ? "bg-white text-black"
                        : "hover:text-black hover:bg-white"
                    }`}
                    onClick={handleOpen}
                  >
                    <li
                      className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
                    >
                      <i
                        className={`fas ${item.icon} ${
                          location.pathname === item.path
                            ? "text-black"
                            : "hover:text-black hover:bg-white"
                        }`}
                      ></i>
                      <p
                        className={`font-semibold ${
                          location.pathname === item.path
                            ? "text-black"
                            : "hover:text-black hover:bg-white"
                        }`}
                      >
                        <span className={`${isOpen ? "md:hidden" : "block"}`}>
                          {item.name}
                        </span>
                      </p>
                    </li>
                  </Link>
                )
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex flex-col gap-y-3 absolute right-0 ${
          isOpen
            ? "hidden md:block md:w-[720px] xl:w-[95.8%] duration-700"
            : "w-full md:w-[560px] xl:w-[87.4%] duration-700"
        }`}
      >
        <header className="flex justify-between items-center shadow-slate-300 shadow-md p-3 w-full">
          <section className="flex gap-x-3 items-center font-bold">
            <i
              className="fas fa-bars text-black text-2xl cursor-pointer"
              onClick={handleOpen}
            ></i>
            <h1 className="md:text-2xl">{title}</h1>
          </section>

          <section
            className="flex items-center gap-x-3 cursor-pointer"
            onClick={handleCard}
          >
            <div className="border-2 border-black rounded-full w-12 h-12 md:w-12 md:h-12 flex justify-center items-center">
              <i className="fas fa-user text-black text-2xl md:text-2xl"></i>
            </div>

            <h1 className="text-xl font-bold">Admin</h1>
          </section>

          {isLogout && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 70 }}
              transition={{ duration: 0.5 }}
              onClick={handleLogout}
              className="bg-red-700 text-white p-3 rounded-lg absolute right-7"
            >
              <button>Logout</button>
            </motion.div>
          )}
        </header>

        <main
          className={`bg-white p-3 rounded-md flex flex-col gap-y-10 lg:w-full lg:self-start lg:p-5 min-h-screen ${
            isOpen ? "mt-5" : ""
          }`}
        >
          {children}
        </main>
      </main>
    </div>
  );
};

export default AuthLayout;
