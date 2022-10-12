import { useEffect, useState, useCallback } from 'react'
import { useSelector } from "react-redux"
import './views.css';
import Card from '../card/card'

function alphabeticallyASC(x, y) {
  if (x.name < y.name) return -1
  if (x.name > y.name) return 1
  return 0
}

function healthScoreASC(x, y) {
  if (x.healthScore < y.healthScore) return -1
  if (x.healthScore > y.healthScore) return 1
  return 0
}


function Views({ currentPage, handlePagination }) {
  const allRecipes = useSelector(state => state.recipes)
  const currentFilters = useSelector(state => state.currentFilters)
  const [orderedRecipes, setOrderedRecipes] = useState(allRecipes)
  const [displayedRecipes, setDisplayedRecipes] = useState(orderedRecipes.slice(0, 9));

  useEffect(() => {
    if (currentFilters.diet !== 'all') {
      let ordered = []
      const filtered = allRecipes.filter(recipe => {
        if (recipe.type === 'api') {
          return recipe.diets.includes(currentFilters.diet)
        } else {
          const foundDiet = recipe.diets.find(diet => diet.name === currentFilters.diet)
          return foundDiet ? true : false
        }
      })

      if (currentFilters.alphabetically === 'A - Z') {
        ordered = filtered.sort(alphabeticallyASC)
      }
      else if (currentFilters.alphabetically === 'Z - A') {
        ordered = filtered.sort(alphabeticallyASC).reverse()
      }
      else if (currentFilters.healthScore === 'Ascendent') {
        ordered = filtered.sort(healthScoreASC)
      }
      else if (currentFilters.healthScore === 'Descendent') {
        ordered = filtered.sort(healthScoreASC).reverse()
      } else {
        ordered = filtered
      }
      setOrderedRecipes(ordered)

    } else {
      let ordered = []

      if (currentFilters.alphabetically === 'A - Z') {
        ordered = [...allRecipes].sort(alphabeticallyASC)
      }
      else if (currentFilters.alphabetically === 'Z - A') {
        ordered = [...allRecipes].sort(alphabeticallyASC).reverse()
      }
      else if (currentFilters.healthScore === 'Ascendent') {
        ordered = [...allRecipes].sort(healthScoreASC)
      }
      else if (currentFilters.healthScore === 'Descendent') {
        ordered = [...allRecipes].sort(healthScoreASC).reverse()
      } else {
        ordered = [...allRecipes]
      }
      setOrderedRecipes(ordered)
    }
  }, [currentFilters])

  const handlePageChange = useCallback((clicked) => {
    if (clicked === 1) {
      setDisplayedRecipes(orderedRecipes.slice(0, 9));
    } else {
      setDisplayedRecipes(orderedRecipes.slice((9 * clicked) - 9, 9 * clicked));
    }
    handlePagination(orderedRecipes.length)
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
