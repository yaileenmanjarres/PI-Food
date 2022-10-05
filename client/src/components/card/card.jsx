// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './card.css';

function Card({ name, id, image, type, diets }) {
  let mapedDiets = type === 'api' ? diets : diets.map(diet => diet.name)

  return (
    <Link to={`/explore/details/${id}`}>
    <div className='card-container'>
      <div className='img-container'>
        <img src={image} alt="" className='img' />
      </div>
      <div className='card-description'>
        <div className='card-title'>
          {name}
        </div>
        <div className='card-list'>
          {
            mapedDiets.map((item, index) => (
              <span className={`diet ${item.split(' ').join('')}`} key={index}>{item}</span>
            ))
          }
        </div>
      </div>
    </div>
    </Link>
  )
}

export default Card;
