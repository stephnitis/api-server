'use strict';

const express = require('express');
const { ClothesModel } = require('../models');
const router = express.Router();

router.get('/clothes', async (req, res, next) => {

  const getClothes  = await ClothesModel.findAll();
  console.log(getClothes);
  res.status(200).send(getClothes);

});

router.get('/clothes/:id', async (req, res, send) => {
  let {id} = req.params;
  console.log('my id is', id);
  let oneCloth = await ClothesModel.findOne({where: {id}});

  console.log(oneCloth);
  res.status(200).send(oneCloth);
});


router.post('/clothes', async (req, res, send) => {
  console.log('clothes req body', req.body);

  const newClothes = await ClothesModel.create(req.body);
  res.status(200).send(newClothes);
});

router.put('/clothes/:id', async (req, res, next) => {
  let {id} = req.params;
  await ClothesModel.update(req.body, {where: {id}});
  let clothesUpdate = await ClothesModel.findOne({where: {id}});
  res.status(200).send(clothesUpdate);

});

router.delete('/clothes/:id', async (req, res) => {
  let {id} = req.params;
  await ClothesModel.destroy({where:{id}});
  res.status(200).send('clothes expired');
});

module.exports = router;
