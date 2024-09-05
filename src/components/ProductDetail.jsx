import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import CustomerReview from './CustomerReview'
import { addtoCart, getData } from '../redux/cartSlice/cartSlice'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductDetail = () => {
  const [product, setProduct] = useState(null)

  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.cart)

  const { uniqueid } = useParams()
  const idd = parseInt(uniqueid)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getData())
    }
  }, [data, dispatch])

  useEffect(() => {
    if (data.length > 0) {
      const productTo = data.find((item) => item.id === idd)
      setProduct(productTo)
    }
  }, [data, idd])

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

  return (
    <>
      <div className='container-fluid px-3'>
        <ToastContainer />
        {product ? (
          <div className='row my-5'>
            <div className='col-12 col-md-6 col-lg-4 mb-4'>
              <img
                src={product.thumbnail}
                className='img-fluid rounded'
                alt={product.title}
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
            </div>
            <div className='col-12 col-md-6 col-lg-8'>
              <div className='d-flex flex-column h-100'>
                <h2 className='mb-4'>{product.title}</h2>
                <p className='fw-bold text-primary'>
                  {product.brand ? `Brand - ${product.brand}` : ''}
                </p>
                <p>Discount Offer - {product.discountPercentage}%</p>
                <p>Rating - {product.rating}</p>
                <p>
                  {product.availabilityStatus} - {product.stock}
                </p>
                <p>{product.shippingInformation}</p>
                <p>{product.returnPolicy}</p>
                <p>
                  Size -{' '}
                  {`${product.dimensions.width} * ${product.dimensions.height} * ${product.dimensions.depth}`}
                </p>
                <p className='fw-bold text-warning'>{product.description}</p>
                <div className='mt-auto'>
                  <button className='btn btn-primary me-2'>
                    {product.price} $
                  </button>
                  <button
                    className='btn btn-warning'
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
        )}
        <div className='my-4'>
          <hr style={{ borderColor: '#fff' }} />
        </div>
        <h5 className='my-4'>Top Reviews</h5>
        {product ? (
          <div className='bg-dark text-light rounded p-3'>
            {product.reviews.map((review, index) => (
              <CustomerReview
                key={index}
                comment={review.comment}
                name={review.reviewerName}
                date={review.date}
                rating={review.rating}
              />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default ProductDetail
