import {
  GET_ALL_RECIPES,
  GET_RECIPE_BY_NAME,
  GET_ALL_DIETS,
  GET_RECIPE_BY_ID,
  SET_CURRENT_FILTERS
} from '../actions/actions'

const initialState = {
  recipes: [],
  selectedRecipe: {},
  diets: [],
  currentFilters: {
    alphabetically: 'none',
    healthScore: 'none',
    diet: 'all'
  }
}


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: action.payload
      }
    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload
      }
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        selectedRecipe: action.payload
      }
    case SET_CURRENT_FILTERS:
      return {
        ...state,
        currentFilters: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
