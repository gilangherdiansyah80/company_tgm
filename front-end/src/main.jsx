import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Users from "./pages/users";
import TambahUser from "./pages/tambahUser";
import EditUser from "./pages/editUser";
import Product from "./pages/product";
import TambahProduct from "./pages/tambahProduct";
import EditProduct from "./pages/editProduct";
import Article from "./pages/article";
import TambahArticle from "./pages/tambahArticle";
import EditArticle from "./pages/editArticle";
import Testimoni from "./pages/testimoni";
import TambahTestimoni from "./pages/tambahTestimoni";
import EditTestimoni from "./pages/editTestimoni";
import TambahAbout from "./pages/tambahAbout";
import About from "./pages/about";
import EditAbout from "./pages/editAbout";
import Team from "./pages/team";
import TambahTeam from "./pages/tambahTeam";
import EditTeam from "./pages/editTeam";
import Images from "./pages/images";
import TambahImages from "./pages/tambahImages";
import EditImages from "./pages/EditImages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/tambahuser",
    element: <TambahUser />,
  },
  {
    path: "/edituser/:id",
    element: <EditUser />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/tambahproduct",
    element: <TambahProduct />,
  },
  {
    path: "/editproduct/:id",
    element: <EditProduct />,
  },
  {
    path: "/article",
    element: <Article />,
  },
  {
    path: "/tambaharticle",
    element: <TambahArticle />,
  },
  {
    path: "/editarticle/:id",
    element: <EditArticle />,
  },
  {
    path: "/testimoni",
    element: <Testimoni />,
  },
  {
    path: "/tambahtestimoni",
    element: <TambahTestimoni />,
  },
  {
    path: "/edittestimoni/:id",
    element: <EditTestimoni />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/tambahabout",
    element: <TambahAbout />,
  },
  {
    path: "/editabout/:id",
    element: <EditAbout />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/tambahteam",
    element: <TambahTeam />,
  },
  {
    path: "/editteam/:id",
    element: <EditTeam />,
  },
  {
    path: "/images",
    element: <Images />,
  },
  {
    path: "/tambahimages",
    element: <TambahImages />,
  },
  {
    path: "/editimages/:id",
    element: <EditImages />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
