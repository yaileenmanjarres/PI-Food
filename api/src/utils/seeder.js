const axios = require('axios')
const { conn } = require('../db');
const { Recipe, Diet, RecipesDiets } = conn.models;
const { API_BASE_URL, API_KEY } = process.env;
const mockDiets = require('../mocks/diets.mock.json');
const mockRecipes = require('../mocks/recipes.mock.json');


async function getRecipes() {
  try {
    // const response = await axios.get(`${API_BASE_URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const response = mockRecipes;
    const recipes = response.data.results.map(recipe => {
      return ({
        id: recipe.id.toString(),
        type: 'db',
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0] ? recipe.analyzedInstructions[0].steps : [],
        diets: recipe.diets,
        image: recipe.image
      })
    })
    return recipes
  } catch (error) {
    console.error(error);
  }
}

const seedDatabase = async () => {
  const recipes = await getRecipes()

  await Recipe.bulkCreate(recipes)
  await Diet.bulkCreate(mockDiets)

  recipes.forEach(async (recipe) => {
    if (recipe.vegetarian) {
      const vegetarianDiet = mockDiets.find(mockDiet => mockDiet.name === 'vegetarian')
      if (vegetarianDiet) {
        await RecipesDiets.create({
          recipeId: recipe.id,
          dietId: vegetarianDiet.id
        })
      }
    }
    if (recipe.lowFodmap) {
      const lowFodmapDiet = mockDiets.find(mockDiet => mockDiet.name === 'low fod map')
      if (lowFodmapDiet) {
        await RecipesDiets.create({
          recipeId: recipe.id,
          dietId: lowFodmapDiet.id
        })
      }
    }
    if (recipe.diets && recipe.diets.length > 0) {
      recipe.diets.forEach(async (diet) => {
        const foundDiet = mockDiets.find(mockDiet => mockDiet.name === diet)
        if (foundDiet) {
          await RecipesDiets.create({
            recipeId: recipe.id,
            dietId: foundDiet.id
          })
        }
      })
    }
  })
}

module.exports = {
  seedDatabase
}
