module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    location: DataTypes.STRING,
  });
  return Event;
};
