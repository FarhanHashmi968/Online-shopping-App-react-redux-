import { useDispatch, useSelector } from 'react-redux'
import { addtoCart, getData } from '../redux/cartSlice/cartSlice'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  const { data, isLoading } = useSelector((state) => state.cart)
  console.log(data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

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
      <div className='d-flex justify-content-center align-items-center vh-100'>
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
    <div className='container-fluid my-5'>
      <ToastContainer />
      <div className='row'>
        {data.map((item) => (
          <div
            className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center'
            key={item.id}
          >
            <div
              className='card bg-dark text-light productCard'
              style={{ width: '100%', maxWidth: '18rem' }}
            >
              <Link
                to={`/productdetail/${item.id}`}
                className='text-decoration-none'
              >
                <div className='p-3 d-flex justify-content-center'>
                  <img
                    src={item.thumbnail}
                    className='card-img-top img-fluid'
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </div>
              </Link>
              <div className='card-body text-center'>
                <h5 className='card-title'>{item.title}</h5>
                <p className='card-text'>
                  {item.description.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </p>
                <div className='d-flex justify-content-center'>
                  <button className='btn btn-primary me-2'>
                    {item.price} $
                  </button>
                  <button
                    className='btn btn-warning'
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
