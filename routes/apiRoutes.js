var db = require("../models");

module.exports = function(app) {
  // Get all appointments
  app.get("/api/appointments", isLoggedIn, function(req, res) {
    db.Appointment.findAll({
      include: [
        {
          model: db.Client,
          as: "Client"
        },
        {
          model: db.Customer,
          as: "Customer"
        }
      ]
    }).then(function(dbAppt) {
      res.json(dbAppt);
    });
  });

  // Create a new appointment
  app.post("/api/appointments", function(req, res) {
    db.Appointment.create({
      customer_id: req.body.customer_id,
      business_id: req.body.business_id,
      start_time: req.body.start_time,
      note: req.body.note,
      ClientId: req.body.business_id,
      CustomerId: req.body.customer_id
    }).then(function(dbAppt) {
      res.json(dbAppt);
    });
  });

  app.put("/api/appointments", function(req, res) {
    db.Appointment.update(
      {
        start_time: req.body.start_time,
        note: req.body.note
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbAppt) {
      res.json(dbAppt);
    });
  });

  // Delete an appointment by id
  app.delete("/api/appointments/:id", function(req, res) {
    console.log("deleting");
    db.Appointment.destroy({ where: { id: req.params.id } }).then(function(
      dbAppt
    ) {
      res.json(dbAppt);
    });
  });

  // Create new customer

  app.post("/api/new-customer", function(req, res) {
    db.Customer.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mName: req.body.mName,
      phone: req.body.phone,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      zipcode: req.body.zipcode
    })
      .then(function(newCustomer) {
        res.json(newCustomer);
      })
      .catch(function(err) {
        if (err) {
          res.json(err);
        }
      });
  });

  // Show appointments for current customer

  app.get("/api/customer-app", function(req, res) {
    console.log("customerid");
    console.log(req.query.customerId);
    db.Appointment.findAll({
      where: {
        ClientId: req.user.id,
        CustomerId: req.query.customerId
      },
      include: [
        {
          model: db.Client,
          as: "Client"
        },
        {
          model: db.Customer,
          as: "Customer"
        }
      ]
    }).then(function(data) {
      res.render("customerAppointments", {
        app: data,
        layout: false
      });
    });
  });

  app.put("/api/new-customer", function(req, res) {
    db.Customer.update(
      {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mName: req.body.mName,
        phone: req.body.phone,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        zipcode: req.body.zipcode
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function(editCustomer) {
        res.json(editCustomer);
      })
      .catch(function(err) {
        if (err) {
          res.json(err);
        }
      });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
