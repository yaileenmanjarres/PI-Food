import { useSelector } from "react-redux"
import './views.css';
import Card from '../card/card'

function Views() {
  const allRecipes = useSelector(state => state.recipes)

  return (
    <div className='views-container'>
      <div className='views'>
        {
          allRecipes.slice(0, 9).map((recipe, index) => (
            <Card
              key={index}
              {...recipe}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Views;
