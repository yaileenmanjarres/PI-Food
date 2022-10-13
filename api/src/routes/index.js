const axios = require('axios')
const { Router, response } = require('express');
const { conn } = require('../db');
const { Op } = require("sequelize");
const { Recipe, Diet, RecipesDiets } = conn.models;
const { API_KEY, API_BASE_URL } = process.env;
const router = Router();

const attributes = ['id', 'type', 'name', 'summary', 'healthScore', 'steps', 'image']

/* OBTENER TODAS LAS RECETAS O UNA RECETA POR NOMBRE */
router.get('/recipes', async (req, res) => {
  const { name } = req.query;

  if (name) {
    const foundDatabaseRecipes = await Recipe.findAll({
      attributes,
      where: {
        name: { [Op.like]: `%${name}%` || name }
      },
      include: {
        attributes: ['id', 'name'],
        model: Diet
      }
    })

    const apiResponse = await axios.get(`${API_BASE_URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${name}`);

    const foundAPIRecipes = apiResponse.data.results.map(recipe => {
      return ({
        id: recipe.id.toString(),
        type: 'api',
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0] ? recipe.analyzedInstructions[0].steps : [],
        diets: recipe.diets,
        image: recipe.image
      })
    })

    const filtered = foundAPIRecipes.filter(recipe => {
      const found = foundDatabaseRecipes.find(item => item.id === recipe.id)
      return found ? false : true
    })

    const response = foundDatabaseRecipes.concat(filtered)
    res.json(response)
  } else {
    const allRecipes = await Recipe.findAll({
      attributes,
      include: {
        model: Diet
      }
    })

    res.json(allRecipes)
  }
})

/* OBTENER DETALLE DE UNA RECETA POR SU ID */
router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  if (id) {
    const databaseResponse = await Recipe.findOne({
      attributes,
      where: {
        id: id.toString()
      },
      include: {
        model: Diet
      }
    })
    if (databaseResponse) {
      res.json(databaseResponse)
    } else {
      const apiResponse = await axios.get(`${API_BASE_URL}/${id.toString()}/information?apiKey=${API_KEY}`);
      const formatted = {
        id: apiResponse.data.id.toString(),
        type: 'api',
        name: apiResponse.data.title,
        summary: apiResponse.data.summary,
        healthScore: apiResponse.data.healthScore,
        steps: apiResponse.data.analyzedInstructions[0] ? apiResponse.data.analyzedInstructions[0].steps : [],
        diets: apiResponse.data.diets,
        image: apiResponse.data.image
      }
      res.json(formatted)
    }
  }
})

/* CREAR UNA RECETA */
router.post('/recipes', async (req, res) => {
  const { name, summary, healthScore, steps, diets, image } = req.body
  const count = await Recipe.count() + 1
  const newId = `C-${count}`
  const createdRecipe = await Recipe.create({
    id: newId,
    type: 'db',
    name,
    summary,
    healthScore,
    steps,
    image
  })
  diets.forEach(async (diet) => {
    await RecipesDiets.create({
      recipeId: createdRecipe.id,
      dietId: diet.id
    })
  });
  res.json(createdRecipe)
})

/* OBTENER TODAS LAS RECETAS */
router.get('/diets', async (req, res) => {
  const allDiets = await Diet.findAll({
    attributes: ['id', 'name'],
  })
  res.json(allDiets)
})



module.exports = router;
