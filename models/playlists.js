const { DataTypes } = require("sequelize");
const { sequelize } = require("./../db");
const Movies = require("./movie");

const Playlists = sequelize.define(
  "playlists",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false
    },
  },
  {
    createdAt: "created_at",
  }
);

Playlists.hasMany(Movies, {});
Movies.belongsTo(Playlists);

module.exports = Playlists;
