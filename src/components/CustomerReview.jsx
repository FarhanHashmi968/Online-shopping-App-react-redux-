import userImg from '../images/userImage.png'

const CustomerReview = ({ comment, name, date, rating, id }) => {
  return (
    <div
      key={id}
      style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}
    >
      <div style={{ display: 'flex' }}>
        <img
          src={userImg}
          alt=''
          style={{
            borderRadius: '34px',
            width: '2rem',
            height: '2rem',
            marginInline: '20px',
          }}
        />
        <p>{name}</p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p>Reviewed At - {date.toString().slice(0, 10)}</p>
        <p
          style={{
            marginLeft: '40px',
            fontWeight: '700',
            color: 'rgb(13, 110, 253)',
            fontSize: '1.05rem',
          }}
        >
          {comment}
        </p>
      </div>
    </div>
  )
}
export default CustomerReview
