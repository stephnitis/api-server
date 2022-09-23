'use strict';

const express = require('express');
const { FoodModel } = require('../models');
const router = express.Router();

router.get('/food', async (req, res, next) => {

  const getSnacks  = await FoodModel.findAll();
  console.log(getSnacks);
  res.status(200).send(getSnacks);

});

router.get('/food/:id', async (req, res, send) => {
  let {id} = req.params;
  console.log('my id is', id);
  let oneSnack = await FoodModel.findOne({where: {id}});

  console.log(oneSnack);
  res.status(200).send(oneSnack);
});


router.post('/food', async (req, res, send) => {
  console.log('food req body', req.body);

  const newFood = await FoodModel.create(req.body);
  res.status(200).send(newFood);
});

router.put('/food/:id', async (req, res, next) => {
  let {id} = req.params;
  await FoodModel.update(req.body, {where: {id}});
  let foodUpdate = await FoodModel.findOne({where: {id}});
  res.status(200).send(foodUpdate);

});

router.delete('/food/:id', async (req, res) => {
  let {id} = req.params;
  await FoodModel.destroy({where:{id}});
  res.status(200).send('food expired');
});

module.exports = router;
