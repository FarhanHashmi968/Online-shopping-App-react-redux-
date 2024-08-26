import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import CustomerReview from './CustomerReview'
import { addtoCart, getData } from '../redux/cartSlice/cartSlice'
import { ToastContainer, toast, Bounce } from 'react-toastify'

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
      <div className='container text-center productDescriptionContainer'>
        <ToastContainer />
        {product ? (
          <>
            {/* Product Details */}
            <div key={product.id} className='container my-5'>
              <div className='card mb-3 bg-dark text-center text-light'>
                <div className='row g-0'>
                  <div className='col-md-4'>
                    <div className='p-0'>
                      <img
                        src={product.thumbnail}
                        className='img-fluid rounded-start'
                        alt={product.title}
                        style={{
                          borderRadius: '10px',
                          height: '25rem',
                        }}
                      />
                    </div>
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body'>
                      <h2
                        style={{ marginBottom: '1.5rem' }}
                        className='card-title'
                      >
                        {product.title}
                      </h2>
                      <p style={{ fontWeight: '700', color: '#0d6efd' }}>
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
                      <p
                        className='card-text'
                        style={{
                          fontWeight: '700',
                          color: '#rgb(227 255 163)',
                        }}
                      >
                        {product.description}
                      </p>
                      <button className='btn btn-primary mx-3'>
                        {product.price} $
                      </button>
                      <button
                        className='btn btn-warning'
                        onClick={() => {
                          handleAddToCart(product)
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
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
        )}
        <div
          style={{
            height: '2px',
            backgroundColor: 'white',
            width: '100%',
            margin: 'auto',
          }}
        />

        {/* Customer review section */}
        <h5 style={{ marginBlock: '30px' }}>Top Reviews</h5>

        {product ? (
          <div
            key={product.id}
            style={{
              backgroundColor: 'rgba(33, 37, 41)',
              borderRadius: '10px',
              marginBlock: '2rem',
            }}
          >
            {product.reviews.map((review, index) => (
              <CustomerReview
                id={index}
                comment={review.comment}
                name={review.reviewerName}
                date={review.date}
                rating={review.rating}
              />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default ProductDetail
