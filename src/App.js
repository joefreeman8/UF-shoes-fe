import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/common/Nav';
import Home from './components/common/Home'
import ProductIndex from './components/products/ProductIndex';
import ProductShow from './components/products/ProductShow';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './styles/App.css'

window.Buffer = window.Buffer || require('buffer').Buffer

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:productId" element={<ProductShow />} />
        <Route path="/shop" element={<ProductIndex />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
