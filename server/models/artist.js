"use strict";

module.exports = function (sequelize, DataTypes) {
  var Artist = sequelize.define(
    "Artist", {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      genre: DataTypes.STRING
    })

  Artist.associate = (models) => {
    Artist.hasMany(models.Song, {
      foreignKey: "artistId",
      onDelete: "cascade",
      hooks: true
    });
  }

  // classMethods: {
  //   associate: function (models) {
  //   }
  // }
  return Artist;
};