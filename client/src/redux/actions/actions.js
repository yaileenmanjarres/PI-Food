export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const SHOW_CREATE_RECIPES = "SHOW_CREATE_RECIPES";
export const POST_CREATE_RECIPE = "POST_CREATE_RECIPE";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_ALL_DIETS = "GET_ALL_DIETS";

const URLBACKEND = 'http://localhost:3001'

export function getAllRecipes() {
  return async function (dispatch) {
    return fetch(`${URLBACKEND}/recipes`)
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_ALL_RECIPES, payload: json })
      })
  }
}

export function getRecipeByName(name) {
  return async function (dispatch) {
    return fetch(`${URLBACKEND}/recipes?name=${name}`)
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_RECIPE_BY_NAME, payload: json })
      })
  }
}

export function showCreateRecipes(openOrClosed) {
  return ({ type: SHOW_CREATE_RECIPES, payload: openOrClosed })
}

export function postCreateRecipe() {

}

export function getRecipeById() {

}

export function getAllDiets() {
  return async function (dispatch) {
    return fetch(`${URLBACKEND}/diets`)
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_ALL_DIETS, payload: json })
      })
  }
}
