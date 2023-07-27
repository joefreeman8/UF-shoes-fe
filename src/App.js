import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/common/Nav.js';
import Home from './components/common/Home.js'
import ProductIndex from './components/products/ProductIndex.js';
import ProductShow from './components/products/ProductShow.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import ReviewProduct from './components/reviews/ReviewProduct.js';
import Basket from './components/basket/Basket.js';

import './styles/App.css'


window.Buffer = window.Buffer || require('buffer').Buffer

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:id/reviews" element={<ReviewProduct />} />
        <Route path="/shop/:id" element={<ProductShow />} />
        <Route path="/shop" element={<ProductIndex />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/basket/:userId" element={<Basket />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
