var db = require("../models");

var moment = require("moment");
moment().format();

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
    var Nexmo = require("nexmo");
    var nexmo = new Nexmo({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    });

    var from = process.env.NEXMO_NUM;
    var to = "1" + req.body.customer_num;
    var name = req.body.customer_name;
    var companyName = req.body.business_name;
    var date = req.body.sliced_date;
    var time = req.body.sliced_time;

    var text =
      "Greetings " +
      name +
      ",\n\nYour appointment has been scheduled on " +
      date +
      " at " +
      time +
      ".\n\n- " +
      companyName;

    nexmo.message.sendSms(from, to, text);

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
      var prettyApp = data.map(function(element) {
        var newDate = moment(element.start_time).format("MMMM Do YYYY, h:mm a");
        element.pretty_start_time = newDate;
        return element;
      });
      res.render("customerAppointments", {
        app: prettyApp,
        layout: false
      });
    });
  });

  app.put("/api/new-customer", function(req, res) {
    db.Customer.update(
      {
        email: req.body.email,
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
