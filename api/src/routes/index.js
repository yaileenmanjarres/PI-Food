const { Router } = require('express');
const { conn } = require('../db');
const { Op } = require("sequelize");
const { Recipe, Diet } = conn.models;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const attributes = ['id', 'name', 'summary', 'healthScore', 'steps']
/* OBTENER TODOS LAS RECETAS O UNA RECETA POR NOMBRE */
router.get('/recipes', async (req, res) => {
  const { name } = req.query;

  if (name) {
    const nameRecipe = await Recipe.findAll({
      attributes,
      where: {
        name: { [Op.like]: `%${name}%` }
      },
      include: {
        attributes: ['id', 'name'],
        model: Diet
      }
    })
    res.json(nameRecipe)
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
    const recipeId = await Recipe.findOne({
      attributes,
      where: {
        id: id
      },
      include: {
        model: Diet
      }
    })
    res.json(recipeId)
  }
})

/* CREAR UNA RECETA */
router.post('/recipes', async (req, res) => {
  const { name, summary, healthScore, steps } = req.body
  const count = await Recipe.count() + 1
  const newId = `C-${count}`
  const createdRecipe = await Recipe.create({
    id: newId,
    name,
    summary,
    healthScore,
    steps
  })
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
