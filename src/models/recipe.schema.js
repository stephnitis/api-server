'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
