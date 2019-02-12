module.exports = function(sequelize, DataTypes) {
    var Appointment = sequelize.define("Appointment", {
        customer_id: DataTypes.INTEGER,
        business_id: DataTypes.INTEGER,
        start_time: DataTypes.DATE,
        note: DataTypes.TEXT
    });
    return Appointment;
  };
  
