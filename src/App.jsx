import { useState } from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { LoadingScreen } from './components';
import NavBar from './components/NavBar';
import { Home, Login, ProductsDetail, Purchases } from './pages';
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </HashRouter>
  )
}

export default App
