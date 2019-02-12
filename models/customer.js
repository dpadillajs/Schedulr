module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING
    });
    return Customer;
  };
  