module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    mName: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        notEmpty: true,
        len: [10]
      }
    },
    age: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    zipcode: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        notEmpty: true,
        len: [5]
      }
    }
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Appointment, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Customer;
};

// I changed colomn "name" to colomns "firstName", "lastName", "MName"
