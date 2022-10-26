const { Recipe, conn } = require('../../src/db.js');
const expect = require('chai').expect
const newRecipe = {
  id: 'C000',
  type: 'db',
  name: 'new recipe',
  summary: 'this is new summary',
  healthScore: 0
}

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('Creacion de receta', () => {
      it('should create a new register', async() => {
        const response = await Recipe.create(newRecipe)
        const expectedResponse = {
          id: 'C000',
          type: 'db',
          name: 'new recipe',
          summary: 'this is new summary',
          healthScore: 0,
          steps: null,
          image: null
        }
        expect(response.dataValues.id).to.eql(expectedResponse.id)
        expect(response.dataValues.type).to.eql(expectedResponse.type)
        expect(response.dataValues.name).to.eql(expectedResponse.name)
        expect(response.dataValues.summary).to.eql(expectedResponse.summary)
        expect(response.dataValues.healthScore).to.eql(expectedResponse.healthScore)
        expect(response.dataValues.steps).to.eql(expectedResponse.steps)
        expect(response.dataValues.image).to.eql(expectedResponse.image)
      });
    });
  });
});
