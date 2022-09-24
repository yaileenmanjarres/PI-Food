const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

/* OBTENER TODOS LAS RECETAS O UNA RECETA POR NOMBRE */
router.get('/recipes', async (req, res) => {
  const { name } = req.query;
  res.send('requested name' + name);
})

/* OBTENER DETALLE DE UNA RECETA POR SU ID */
router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  res.send('requested id' + id)
})

/* CREAR UNA RECETA */
router.post('/recipes', async (req, res) => {
  res.send('create recipes')
})

/* OBTENER TODAS LAS RECETAS */
router.get('/diets', async (req, res) => {
  res.send('routes diets');
})



module.exports = router;
