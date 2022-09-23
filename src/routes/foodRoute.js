'use strict';

const express = require('express');
const { FoodModel } = require('../models');
const router = express.Router();

router.get('/food', async (req, res, next) => {

  const getSnacks  = await FoodModel.findAll();
  console.log(getSnacks);
  res.status(200).send(getSnacks);

});
