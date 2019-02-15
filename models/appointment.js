module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    customer_id: DataTypes.INTEGER,
    business_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    note: DataTypes.TEXT
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    });

    Appointment.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Appointment;
};
