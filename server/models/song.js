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
      as: "artist",
      onDelete: "cascade",
      hooks: true
    });

    // song has many lyrics in different languages
    Song.hasMany(models.Lyrics, {
      foreignKey: "songId",
      as: "lyrics",
      onDelete: "cascade",
      hooks: true
    });
  }
  return Song;
};