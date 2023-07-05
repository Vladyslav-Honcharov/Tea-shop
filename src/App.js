import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import "./App.css";
import ShopContextProvider from "./context/ShopContext";
import Footer from "./components/Footer";

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
      <Footer />
    </ShopContextProvider>
  );
}

export default App;
