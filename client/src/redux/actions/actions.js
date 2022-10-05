const axios = require('axios')
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const POST_CREATE_RECIPE = "POST_CREATE_RECIPE";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const SET_CURRENT_FILTERS = "SET_CURRENT_FILTERS";

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

export function getAllDiets() {
  return async function (dispatch) {
    return fetch(`${URLBACKEND}/diets`)
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_ALL_DIETS, payload: json })
      })
  }
}

export function postCreateRecipe(data) {
  return async function (dispatch) {
    const response = await axios.post(`${URLBACKEND}/recipes`, { ...data })
    dispatch({ type: POST_CREATE_RECIPE, payload: response.data})
  }
}

export function getRecipeById(id) {
  return async function (dispatch) {
    return fetch(`${URLBACKEND}/recipes/${id}`)
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_RECIPE_BY_ID, payload: json })
      })
  }
}

export function setCurrentFilters(filter) {
  return { type: SET_CURRENT_FILTERS, payload: filter }
}
