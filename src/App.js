import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import ProductIndex from './components/ProductIndex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductIndex />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
