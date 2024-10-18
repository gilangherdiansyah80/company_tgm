import { useState } from "react";

const Login = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: dataForm.username,
          password: dataForm.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", dataForm.username);
        alert("Login Berhasil");
        window.location.href = "/home";
      } else {
        alert("Login Gagal");
        console.log(`Login Gagal: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenPassword = () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  };

  return (
    <div className="bg-gradient-to-l from-[#67BD5E] to-[#467840] p-3 flex flex-col gap-y-10 h-screen w-full items-center justify-center">
      <main className="flex flex-col justify-center items-center gap-y-10 w-full lg:flex-row lg:gap-x-5 xl:w-3/5 xl:gap-x-7">
        <section className="flex flex-col gap-y-3 justify-center items-center lg:w-1/2">
          <div className="bg-white p-3 lg:p-5 flex flex-col justify-center items-center rounded-full h-20 w-20 md:w-52 md:h-52">
            <img src="images/logo.png" alt="tgm" />
          </div>
          <article className="text-center text-white font-bold md:text-2xl">
            Selamat Datang Admin silahkan isi form dibawah ini untuk login
          </article>
        </section>

        <section className="flex flex-col gap-y-5 w-full lg:w-1/2">
          <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="username"
                className="text-white font-bold md:text-2xl"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Input your username"
                className="p-3 rounded-lg"
                value={dataForm.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="password"
                className="text-white font-bold md:text-2xl"
              >
                Password
              </label>
              <div className="flex items-center relative">
                <input
                  type="password"
                  className="p-3 rounded-lg w-full text-black"
                  id="password"
                  placeholder="*******"
                  value={dataForm.password}
                  onChange={handleChange}
                />
                <i
                  className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-gray-500"
                  onClick={handleOpenPassword}
                ></i>
              </div>
            </div>
            <div>
              <button
                className="bg-white text-[#67BD5E] p-3 rounded-lg w-full text-xl"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
