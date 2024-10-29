import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Home = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCard = () => {
    setIsLogout(!isLogout);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("admin");
  };

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
        <nav className={`flex flex-col w-3/6 ${isOpen ? "" : "mt-20"}`}>
          <ul className="w-full flex flex-col gap-y-5">
            <Link
              to="/home"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/home"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-home ${
                    location.pathname === "/home"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/home"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>Home</p>
                </p>
              </li>
            </Link>
            <Link
              to="/users"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/users"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-users ${
                    location.pathname === "/users"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/users"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>Users</p>
                </p>
              </li>
            </Link>
            <Link
              to="/product"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/product"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-shopping-cart ${
                    location.pathname === "/product"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/product"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>Product</p>
                </p>
              </li>
            </Link>
            <Link
              to="/article"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/article"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-newspaper ${
                    location.pathname === "/article"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/article"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>Artikel</p>
                </p>
              </li>
            </Link>
            <Link
              to="/testimoni"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/testimoni"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-star ${
                    location.pathname === "/testimoni"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/testimoni"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>
                    Testimoni
                  </p>
                </p>
              </li>
            </Link>
            <Link
              to="/about"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/about"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-tags ${
                    location.pathname === "/about"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/about"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>
                    Tentang Kami
                  </p>
                </p>
              </li>
            </Link>
            <Link
              to="/team"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/team"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-users ${
                    location.pathname === "/team"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/team"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>Team</p>
                </p>
              </li>
            </Link>
            <Link
              to="/images"
              className={`text-xl p-3 text-white w-[1000px] h-14 rounded-s-full right-0 ${
                location.pathname === "/images"
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white"
              }`}
              onClick={handleOpen}
            >
              <li
                className={`flex items-center gap-x-3 justify-center absolute md:text-2xl`}
              >
                <i
                  className={`fas fa-images ${
                    location.pathname === "/images"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                ></i>
                <p
                  className={`font-semibold ${
                    location.pathname === "/images"
                      ? "text-black"
                      : "hover:text-black hover:bg-white"
                  }`}
                >
                  <p className={`${isOpen ? "md:hidden" : "block"}`}>Images</p>
                </p>
              </li>
            </Link>
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

export default Home;
