var db = require("../models");

module.exports = function(app, passport) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExample) {
      res.render("landingPage", {
        msg: "This is the index page.  Login here.",
        examples: dbExample
      });
    });
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
        db.Customer.findAll({}).then(function(dbCustomer) {
          res.render("dashboard", {
            msg: "Welcome!",
            bus_id: req.params.client_id,
            client: dbClient,
            appointments: dbAppt,
            listOfCustomers: dbCustomer
          });
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

  //Authentification

  app.post("/signup", function(req, res, next) {
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
        res.json({ valid: true });
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
