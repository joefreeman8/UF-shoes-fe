import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/common/Nav';
import Home from './components/common/Home'
import ProductIndex from './components/ProductIndex';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductIndex />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
