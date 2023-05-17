const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const Recommendations = require('./recommendations');

const Movies = sequelize.define("movies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movieUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  heroImg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Movies.hasMany(Recommendations, {});

Recommendations.belongsTo(Movies);

module.exports = Movies;
