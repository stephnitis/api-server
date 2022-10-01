'use strict';

const express = require('express');
const { recipeInterface} = require('../models');
const router = express.Router();

router.get('/recipes', async (req, res, next) => {

  const getRecipes  = await recipeInterface.read();
  console.log(getRecipes);
  res.status(200).send(getRecipes);

});

router.get('/recipes/:id', async (req, res, send) => {
  let {id} = req.params;
  let oneRecipe = await recipeInterface.read(id);
  res.status(200).send(oneRecipe);
});


router.post('/recipes', async (req, res, send) => {
  console.log('recipes req body', req.body);

  const newRecipes = await recipeInterface.create(req.body);
  res.status(200).send(newRecipes);
});

router.put('/recipes/:id', async (req, res, next) => {
  let {id} = req.params;

  let recipesUpdate = await recipeInterface.update(req.body, id);
  res.status(200).send(recipesUpdate);

});

router.delete('/recipes/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    await recipeInterface.delete(id);
    res.status(200).send('recipe trashed');
  } catch(error){
    console.log('Unable to Delete', error.message);
    next('Unable to Delete');
  }

});

module.exports = router;
