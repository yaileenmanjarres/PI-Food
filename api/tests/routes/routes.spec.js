/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
const expect = require('chai').expect
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  id: 'id',
  type: 'db',
  name: 'Milanea a la napolitana',
  summary: 'summary',
  healthScore: 100
};

const expectedResponse = {
  steps: null,
  id: 'id',
  type: 'db',
  name: 'Milanea a la napolitana',
  summary: 'summary',
  healthScore: 100,
  image: null,
  diets: []
}

describe('Recipe routes', () => {
  before(() => conn.authenticate().catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true }).then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', async () => {
      const response = await agent.get('/recipes')
      expect(response.status).to.eql(200)
    });
    it('should get recipes', async () => {   
      const response = await agent.get('/recipes')
      expect(response.body[0]).to.eql(expectedResponse)
    });
  });
});
