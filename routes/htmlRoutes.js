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

  app.get("/dashboard/client", function(req, res) {
    db.Example.findAll({}).then(function(dbExample) {
      res.render("client_Dashboard", {
        msg: "This is the index page.  Login here.",
        examples: dbExample
      });
    });
  });

  app.get("/client/:client_id", function(req, res) {
    db.Appointment.findAll({
      where: {
        business_id: req.params.client_id
      },
      include: [db.Client]
    }).then(function(dbAppt) {
      res.render("client", {
        msg: "Welcome!",
        bus_id: req.params.client_id,
        appointments: dbAppt
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/client/appointment/:id", function(req, res) {
    db.Appointment.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Client]
    }).then(function(dbAppt) {
      res.render("editappt", {
        msg: "This is appointment " + req.params.id,
        appointment: dbAppt
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
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
        res.json({ id: user.dataValues.id });
      });
    })(req, res, next);
  });
};
