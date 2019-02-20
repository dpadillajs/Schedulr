var db = require("../models");
var upload = require("./multer");

var moment = require("moment");
moment().format();

module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    res.render("landingPage");
  });

  app.get("/client", isLoggedIn, function(req, res) {
    db.Client.findOne({
      where: {
        id: req.user.id
      }
    }).then(function(dbClient) {
      db.Appointment.findAll({
        where: {
          business_id: req.user.id
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
      }).then(function(dbAppt) {
        var prettyApp = dbAppt.map(function(element) {
          var newDate = moment(element.start_time).format(
            "MMMM Do YYYY, h:mm a"
          );
          element.pretty_start_time = newDate;
          return element;
        });
        db.Appointment.count({
          where: {
            business_id: req.user.id
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
        }).then(function(dbApptCount) {
          console.log("query");
          console.log(req.query);
          if (Object.keys(req.query).length === 0 || req.query.sval === "") {
            db.Customer.findAll({}).then(function(dbCustomer) {
              res.render("dashboard", {
                client: dbClient,
                appointments: prettyApp,
                listOfCustomers: dbCustomer,
                numOfAppointments: dbApptCount
              });
            });
          } else if (req.query) {
            var key = req.query.stype;
            var val = req.query.sval;
            var ob = {};
            ob[key] = val;
            db.Customer.findAll({
              where: ob
            }).then(function(dbCustomer) {
              res.render("dashboard", {
                client: dbClient,
                appointments: prettyApp,
                listOfCustomers: dbCustomer,
                numOfAppointments: dbApptCount
              });
            });
          }
        });
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/client/appointment/:id", isLoggedIn, function(req, res) {
    db.Appointment.findAll({
      where: {
        id: req.params.id
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
    }).then(function(dbAppt) {
      res.render("editappt", {
        msg: "This is appointment " + req.params.id,
        appointment: dbAppt
      });
    });
  });

  //customer appointment page
  app.get("/customer/:id", function(req, res) {
    db.Appointment.findAll({
      where: {
        customer_id: req.params.id
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
    }).then(function(dbAppt) {
      db.Customer.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(dbCust) {
        res.render("customer", {
          msg: "This is appointment " + req.params.id,
          appointments: dbAppt,
          customer: dbCust
        });
      });
    });
  });

  //Authentification
  app.post("/signup", upload.single("file"), function(req, res, next) {
    passport.authenticate("local-signup", function(err, user, info) {
      console.log(err);
      console.log(user);
      console.log(info);
      if (err) {
        return next(err);
      }
      if (!user) {
        res.json(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect("/client");
      });
    })(req, res, next);
  });

  app.post("/signin", function(req, res, next) {
    passport.authenticate("local-signin", function(err, user, info) {
      if (err) {
        return next(info);
      }
      if (!user) {
        res.json(info);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.json({ valid: true });
        });
      }
    })(req, res, next);
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(function() {
      res.redirect("/");
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
