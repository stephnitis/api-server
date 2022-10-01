'use strict';

const supertest = require('supertest');
const {app} = require('../src/server');
const { sequelizeDatabase } = require('../src/models');

const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('API Server', () => {

  it('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });

  it('handles errors', async () => {
    const response = await request.get('/bad');

    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('this route is bad');
  });

  it('handles root path', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toEqual('hello');
  });


});

describe('Testing Recipe CRUD', () => {

  it('Creates a recipe', async() => {
    let responseOne = await request.post('/recipes').send({
      name: 'test one',
      ingredients: 'one ingredient',
      servings: 1,
    });
    let responseTwo = await request.post('/recipes').send({
      name: 'test two',
      ingredients: 'two ingredients',
      servings: 2,
    });

    expect(responseOne.status).toEqual(200);
    expect(responseOne.body.name).toEqual('test one');
    expect(responseOne.body.ingredients).toEqual('one ingredient');
    expect(responseOne.body.servings).toEqual(1);
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.name).toEqual('test two');
    expect(responseTwo.body.ingredients).toEqual('two ingredients');
    expect(responseTwo.body.servings).toEqual(2);

  });

  test('Reads All recipes', async () => {
    let response = await request.get('/recipes');
    console.log('should be two test records', response.body);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toEqual('test one');
    expect(response.body[0].ingredients).toEqual('one ingredient');
    expect(response.body[0].servings).toEqual(1);
    expect(response.body[1].name).toEqual('test two');
    expect(response.body[1].ingredients).toEqual('two ingredients');
    expect(response.body[1].servings).toEqual(2);

  });

  test('Reads Single recipe', async () => {
    let response = await request.get('/recipes/1');

    expect(response.body.name).toEqual('test one');
    expect(response.body.ingredients).toEqual('one ingredient');
    expect(response.body.servings).toEqual(1);
  });

  test('Updates a recipe', async () => {
    let response = await request.put('/recipes/2').send({
      name: 'test update',
      ingredients: 'three ingredients',
      servings: 3,
    });

    expect(response.body.name).toEqual('test update');
    expect(response.body.ingredients).toEqual('three ingredients');
    expect(response.body.servings).toEqual(3);
  });

  test('Delete a recipe', async () => {
    await request.delete('/recipes/1');
    let response = await request.get('/recipes');
    console.log('should have 1 record', response.body);

    expect(response.body.length).toBe(1);
  });
});

describe('Testing food CRUD', () => {

  it('Creates a food', async() => {
    let responseOne = await request.post('/food').send({
      name: 'test food one',
      calories: 999,
      group: 'fruit',
    });
    let responseTwo = await request.post('/food').send({
      name: 'test food two',
      calories: 888,
      group: 'protein',
    });

    expect(responseOne.status).toEqual(200);
    expect(responseOne.body.name).toEqual('test food one');
    expect(responseOne.body.calories).toEqual(999);
    expect(responseOne.body.group).toEqual('fruit');
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.name).toEqual('test food two');
    expect(responseTwo.body.calories).toEqual(888);
    expect(responseTwo.body.group).toEqual('protein');

  });

  test('Reads All foods', async () => {
    let response = await request.get('/food');
    console.log('should be two test records', response.body);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toEqual('test food one');
    expect(response.body[0].calories).toEqual(999);
    expect(response.body[0].group).toEqual('fruit');
    expect(response.body[1].name).toEqual('test food two');
    expect(response.body[1].calories).toEqual(888);
    expect(response.body[1].group).toEqual('protein');

  });

  test('Reads Single food', async () => {
    let response = await request.get('/food/1');

    expect(response.body.name).toEqual('test food one');
    expect(response.body.calories).toEqual(999);
    expect(response.body.group).toEqual('fruit');
  });

  test('Updates a food', async () => {
    let response = await request.put('/food/2').send({
      name: 'test update',
      calories: 777,
      group: 'vegetable',
    });

    expect(response.body.name).toEqual('test update');
    expect(response.body.calories).toEqual(777);
    expect(response.body.group).toEqual('vegetable');
  });

  test('Delete a food', async () => {
    await request.delete('/food/1');
    let response = await request.get('/food');
    console.log('should have 1 record', response.body);

    expect(response.body.length).toBe(1);
  });

});
