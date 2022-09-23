'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('mountains', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group: {
      type: DataTypes.ENUM,
      values: ['grains', 'fruit', 'vegetable', 'protein', 'dairy', 'fat'],
      allowNull: true,
    },
  });
};
