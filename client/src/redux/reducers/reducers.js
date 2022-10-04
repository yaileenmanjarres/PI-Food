import {
  GET_ALL_RECIPES,
  GET_RECIPE_BY_NAME,
  SHOW_CREATE_RECIPES,
  GET_ALL_DIETS,
  // POST_CREATE_RECIPE,
  // GET_RECIPE_BY_ID,
} from '../actions/actions'

const initialState = {
  recipes: [],
  selectedRecipe: {},
  showCreateRecipes: false,
  diets: [],
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
    case SHOW_CREATE_RECIPES:
      return {
        ...state,
        showCreateRecipes: action.payload
      }
    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
