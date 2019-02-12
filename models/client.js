module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    bus_name: DataTypes.STRING,
    first_apt: DataTypes.DATE,
    last_apt: DataTypes.DATE
  });
  return Client;
};
