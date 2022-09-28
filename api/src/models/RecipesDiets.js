const { DataTypes } = require('sequelize');
const Diet = require('./Diet');
const Recipe = require('./Recipe');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipesDiets', {
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: 'id'
      }
    },
    dietId: {
      type: DataTypes.INTEGER,
      references: {
        model: Diet,
        key: 'id'
      }
    }
  });
};
