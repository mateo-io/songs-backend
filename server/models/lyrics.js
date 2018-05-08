'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lyrics = sequelize.define('Lyrics', {
    content: DataTypes.TEXT,
    language: DataTypes.STRING,
    fetchedFrom: DataTypes.STRING
  }, {});
  Lyrics.associate = function(models) {
    // associations can be defined here
  };
  return Lyrics;
};