import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/cartSlice/cartSlice'
import { Link } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
  const selectedCartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <>
      <ToastContainer />
      <div className='container text-center my-5' style={{ width: '700px' }}>
        {selectedCartItems.items.length == 0 && (
          <>
            <h1>Your Cart is empty....</h1>
            <Link to='/' className='btn btn-warning'>
              Continue shopping
            </Link>
          </>
        )}
      </div>
      <div className='container text-center my-5' style={{ width: '700px' }}>
        {selectedCartItems.items.map((item) => (
          <div key={item.id} className='container my-5'>
            <div
              className='card mb-3 bg-dark text-center text-light'
              style={{ maxWidth: '650px' }}
            >
              <div className='row g-0'>
                <div className='col-md-4'>
                  <div className='p-3'>
                    <img
                      src={item.imgSrc}
                      className='img-fluid rounded-start'
                      alt='...'
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>{item.title}</h5>
                    <p className='card-text'>{item.description}</p>
                    <button className='btn btn-primary mx-3'>
                      {item.price} ₹
                    </button>
                    <button className='btn btn-warning'>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {selectedCartItems.items.length != 0 && (
          <button
            className='btn btn-warning'
            onClick={() => {
              {
                dispatch(clearCart())
                toast.success('🦄 Cart cleared!', {
                  position: 'top-right',
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'dark',
                  transition: Bounce,
                })
              }
            }}
          >
            Clear Cart
          </button>
        )}
      </div>
    </>
  )
}
export default Cart
