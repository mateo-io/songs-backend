'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lyrics = sequelize.define('Lyrics', {
    content: DataTypes.TEXT,
    language: DataTypes.STRING,
    fetchedFrom: DataTypes.STRING
  });


  Lyrics.associate = (models) => {
    Lyrics.belongsTo(models.Song, {
      foreignKey: "songId",
      targetKey: "id",
      // as: "songId",
      onDelete: "cascade",
      hooks: true
    });
  };
  return Lyrics;
};