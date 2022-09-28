import './card.css';

function Card({ title, image }) {
  return (
    <div>
      <div className='card-container'>
        <div>
          <img src={image} alt="" className='img' />
          <div className='text'>
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;
