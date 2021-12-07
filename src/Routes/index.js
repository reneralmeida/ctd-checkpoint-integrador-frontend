import { BrowserRouter, Routes, Route } from "react-router-dom"
import Error404 from "../Pages/404";
import Home from "../Pages/Home.js";
import Products from "../Pages/Products"
import Product from "../Pages/Product";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

//Use params
const Routlist = () => {
    return (
  <BrowserRouter>
      <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<Products />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>
    )
};

export default Routlist;


