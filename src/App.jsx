import Navbar from './components/Navbar'
import Cart from './components/cart'
import Product from './components/product'
import '../src/index.css'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}
export default App
