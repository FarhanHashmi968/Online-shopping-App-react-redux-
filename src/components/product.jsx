import { useDispatch, useSelector } from 'react-redux'
// import { Products } from '../data'
import { addtoCart, getData } from '../redux/cartSlice/cartSlice'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

const Product = () => {
  const { data, isLoading } = useSelector((state) => state.cart)
  console.log(data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [])

  const handleAddToCart = (item) => {
    dispatch(addtoCart(item))
    toast.success('🦄 Item added to cart!', {
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

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='spinner-grow text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-warning' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-success' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='d-flex justify-content-center'>
      <ToastContainer />
      <div className='container'>
        <div className='row'>
          {data.map((item) => (
            <div
              className='container col-md-4 my-5 d-flex justify-content-center'
              key={item.id}
            >
              <div className='card bg-dark' style={{ width: '18rem' }}>
                <div className='p-3 d-flex justify-content-center align-items-center'>
                  <img
                    src={item.thumbnail}
                    className='card-img-top'
                    alt='...'
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <div className='card-body text-light text-center'>
                  <h5 className='card-title'>{item.title}</h5>
                  <p className='card-text'>{item.description}</p>
                  <button className='btn btn-primary mx-3 my-2'>
                    {item.price} $
                  </button>
                  <button
                    className='btn btn-warning'
                    onClick={() => {
                      handleAddToCart(item)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Product
