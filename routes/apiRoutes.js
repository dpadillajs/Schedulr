var db = require("../models");

module.exports = function(app) {
  // Get all appointments
  app.get("/api/appointments", function(req, res) {
    db.Appointment.findAll({
      include: [db.Client]
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
      ClientId: req.body.business_id
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
};
