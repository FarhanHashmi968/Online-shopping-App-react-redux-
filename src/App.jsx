import Navbar from './components/Navbar'
import Cart from './components/cart'
import Product from './components/product'
import ProductDetail from './components/ProductDetail'
import '../src/index.css'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/productdetail/:uniqueid' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}
export default App
