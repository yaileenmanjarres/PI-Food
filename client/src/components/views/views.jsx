import { useEffect, useState, useCallback } from 'react'
import { useSelector } from "react-redux"
import './views.css';
import Card from '../card/card'

function Views({ currentPage }) {
  const allRecipes = useSelector(state => state.recipes)
  const [displayedRecipes, setDisplayedRecipes] = useState(allRecipes.slice(0, 9));

  const handlePageChange = useCallback((clicked) => {
    if (clicked === 1) {
      setDisplayedRecipes(allRecipes.slice(0, 9));
    } else {
      setDisplayedRecipes(allRecipes.slice((9 * clicked) - 9, 9 * clicked));
    }
  }, [allRecipes])

  useEffect(() => {
    handlePageChange(currentPage)
  }, [currentPage, allRecipes, handlePageChange])

  return (
    <div className='views-container'>
      <div className='views'>
        {
          displayedRecipes.map((recipe, index) => (
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
