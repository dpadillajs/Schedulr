var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExample) {
      res.render("landingPage", {
        msg: "This is the index page.  Login here.",
        examples: dbExample
      });
    });
  });

  app.get("/client/:client_id", function(req, res) {
    db.Appointment.findAll({
      where: {
        business_id: req.params.client_id
      }
    }).then(function(dbAppt) {
      res.render("client", {
        msg: "Welcome client " + req.params.client_id,
        appointments: dbAppt
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/client/appointment/:id", function(req, res) {
    db.Appointment.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbAppt) {
      res.render("appointment", {
        msg: "This is appointment " + req.params.id,
        appointment: dbAppt
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
