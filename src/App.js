import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/common/Nav';
import Home from './components/common/Home'
import ProductIndex from './components/products/ProductIndex';
import ProductShow from './components/products/ProductShow';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductIndex />} />
        <Route path="/shop/:productId" element={<ProductShow />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
