import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  return (
    <div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #444",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProductPage />} />
        <Route path="/Products/:id" element={<ProductDetailPage />} />
      </Routes>

    </div>
  );
};

export default App;