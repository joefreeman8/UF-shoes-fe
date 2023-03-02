import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/common/Nav';
import Home from './components/common/Home'
import ProductIndex from './components/products/ProductIndex';
import ProductShow from './components/products/ProductShow';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ReviewProduct from './components/reviews/ReviewProduct';

import './styles/App.css'
import Basket from './components/common/Basket';
import BasketDelete from './components/BasketDelete';

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
        <Route path="/basket/:userId/:productId" element={<BasketDelete />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
