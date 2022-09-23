'use strict';

const express = require('express');
const { foodInterface } = require('../models');
const router = express.Router();


router.get('/food', async (req, res, next) => {

  const getSnacks  = await foodInterface.read();
  console.log(getSnacks);
  res.status(200).send(getSnacks);

});

router.get('/food/:id', async (req, res, send) => {
  let {id} = req.params;
  console.log('my id is', id);
  let oneSnack = await foodInterface.read(id);

  res.status(200).send(oneSnack);
});


router.post('/food', async (req, res, send) => {
  console.log('food req body', req.body);

  const newFood = await foodInterface.create(req.body);
  res.status(200).send(newFood);
});

// router.put('/food/:id', async (req, res, next) => {
//   let {id} = req.params;
//   await foodInterface.update(req.body, {where: {id}});
//   let foodUpdate = await foodInterface.findOne({where: {id}});
//   res.status(200).send(foodUpdate);

// });

// router.delete('/food/:id', async (req, res) => {
//   let {id} = req.params;
//   await foodInterface.destroy({where:{id}});
//   res.status(200).send('food expired');
// });

router.get('/foodsMixed', async (req, res, next) => {
  let {id} = req.params;
  let foodsMixed = await foodInterface.readManyToOne(id, foodInterface.model);
  res.status(200).send(foodsMixed);
});

//if CRUD was not extracted this is what this SHOULD look like
// router.get('/foodsMixed', async (req, res, next) => {
//   let {id} = req.params;
//   let query = {
//     where: {id},
//     include: FoodModel,
//   };
//   let foodsMixed = await FoodModel.findOne(query);
//   res.status(200).send(foodsMixed);
// })

module.exports = router;
