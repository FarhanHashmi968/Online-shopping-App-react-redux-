import userImg from '../images/userImage.png'

const CustomerReview = ({ comment, name, date, rating }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      <p>Reviewed At - {date.toString().slice(0, 10)}</p>
    </div>
  )
}
export default CustomerReview
