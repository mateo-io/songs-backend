"use strict";

module.exports = function (sequelize, DataTypes) {
  var Song = sequelize.define(
    "Song", {
      title: DataTypes.STRING,
      language: DataTypes.STRING,
    })
  Song.associate = (models) => {
    Song.belongsTo(models.Artist, {
      foreignKey: "artistId",
      targetKey: "id",
      onDelete: "cascade",
      hooks: true
    });
  }
  return Song;
};