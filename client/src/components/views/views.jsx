import { useEffect, useState, useCallback } from 'react'
import { useSelector } from "react-redux"
import './views.css';
import Card from '../card/card'

function Views({ currentPage }) {
  const allRecipes = useSelector(state => state.recipes)
  const currentFilters = useSelector(state => state.currentFilters)
  const [orderedRecipes, setOrderedRecipes]  = useState(allRecipes)
  const [displayedRecipes, setDisplayedRecipes] = useState(orderedRecipes.slice(0, 9));

  useEffect(() => {
    console.log(currentFilters);
    if (currentFilters.diet !== 'all') {
    }
  }, [currentFilters])

  const handlePageChange = useCallback((clicked) => {
    if (clicked === 1) {
      setDisplayedRecipes(orderedRecipes.slice(0, 9));
    } else {
      setDisplayedRecipes(orderedRecipes.slice((9 * clicked) - 9, 9 * clicked));
    }
  }, [orderedRecipes])

  useEffect(() => {
    setOrderedRecipes(allRecipes)
  }, [allRecipes])

  useEffect(() => {
    handlePageChange(currentPage)
  }, [currentPage, orderedRecipes, handlePageChange])

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
