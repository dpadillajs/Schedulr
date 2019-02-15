module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  // Customer.associate = function(models) {
  //   Customer.hasMany(models.Appointment, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Customer;
};
