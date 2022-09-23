'use strict';

require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const clothesSchema = require('./clothes.schema');
const foodSchema = require('./food.schema');

const DATABASE_URL = process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const ClothesModel = clothesSchema(sequelizeDatabase, DataTypes);
const FoodModel = foodSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  ClothesModel,
  FoodModel,
};
