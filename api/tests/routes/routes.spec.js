/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
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

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should get recipes', () => {
      agent.get('/recipes').then((res) => {
        expect(res.body[0]).to.be.equal({
          steps: null,
          id: 'id',
          type: 'db',
          name: 'Milanea a la napolitana',
          summary: 'summary',
          healthScore: 100,
          image: null,
          diets: []
        })
      })
    }
  );
  });
});
