import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CustomerReview from './CustomerReview'

const ProductDetail = () => {
  const { uniqueid } = useParams()
  const idd = parseInt(uniqueid)

  const { data } = useSelector((state) => state.cart)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const productTo = data.find((item) => item.id === idd)
    setProduct(productTo)
  }, [data, idd])

  return (
    <>
      <div
        className='container text-center productDescriptionContainer'
        style={{ border: '1px solid red' }}
      >
        {product ? (
          <>
            {/* Product Details */}
            <div
              key={product.id}
              className='container my-5'
              style={{ border: '2px solid purple' }}
            >
              <div
                className='card mb-3 bg-dark text-center text-light'
                style={{ border: '2px solid yellow' }}
              >
                <div className='row g-0' style={{ border: '2px solid blue' }}>
                  <div
                    className='col-md-4'
                    style={{ border: '2px solid cyan' }}
                  >
                    <div className='p-0' style={{ border: '2px solid orange' }}>
                      <img
                        src={product.thumbnail}
                        className='img-fluid rounded-start'
                        alt={product.title}
                        style={{
                          borderRadius: '10px',
                          height: '25rem',
                          border: '2px solid cyan',
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
                        Brand - {product.brand}
                      </p>

                      <p>Discount Offer - {product.discountPercentage}%</p>
                      <p>Rating - {product.rating}</p>
                      <p>
                        <p>
                          {product.availabilityStatus} - {product.stock}
                        </p>
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
                      <button className='btn btn-warning'>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No product found</p>
        )}
        <div
          style={{
            height: '2px',
            backgroundColor: 'white',
            width: '100%',
            margin: 'auto',
          }}
        />
        <h5 style={{ marginBlock: '20px' }}>Top Reviews</h5>

        {product ? (
          <div
            style={{
              backgroundColor: 'rgba(33, 37, 41)',
              borderRadius: '10px',
            }}
          >
            {product.reviews.map((review) => (
              <CustomerReview
                comment={review.comment}
                name={review.reviewerName}
                date={review.date}
                rating={review.rating}
              />
            ))}
          </div>
        ) : (
          'No Product found'
        )}
      </div>
    </>
  )
}

export default ProductDetail
