'use strict';

require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const recipeSchema = require('./recipe.schema');
const foodSchema = require('./food.schema');
const Collection = require('./collection-class');

const DATABASE_URL = process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const RecipeModel = recipeSchema(sequelizeDatabase, DataTypes);
const FoodModel = foodSchema(sequelizeDatabase, DataTypes);

RecipeModel.hasMany(FoodModel);
FoodModel.belongsTo(RecipeModel);

module.exports = {
  sequelizeDatabase,
  recipeInterface: new Collection(RecipeModel),
  foodInterface: new Collection(FoodModel),
};
