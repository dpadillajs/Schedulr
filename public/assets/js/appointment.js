var $startTime = $("#appt-date");
var $submitBtn = $("#createAppt");
var $editBtn = $(".save-edit");
var $cancBtn = $(".delete");
var $custNote = $("#custNote");

var API = {
  saveAppointment: function(appt) {
    console.log("Saving 2");
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/appointments",
      data: JSON.stringify(appt)
    });
  },
  getAppointments: function() {
    return $.ajax({
      url: "/api/appointments",
      type: "GET"
    });
  },
  deleteAppointment: function(id) {
    return $.ajax({
      url: "/api/appointments/" + id,
      type: "DELETE"
    });
  }
};

var newAppointment = function(event) {
  event.preventDefault();
  console.log("saving - newAppt 1");
  var custID = $("select.customerName")
    .find(":selected")
    .data("id");
  console.log(
    $("select.customerName")
      .find(":selected")
      .val()
  );
  var busID = $(this).attr("data-id");
  var noteText = $custNote.val().trim();
  var apptTime = $startTime.val().trim();

  console.log("Cust ID: " + custID);
  console.log("Bus ID: " + busID);
  console.log("Note: " + noteText);
  console.log("Appt Time: " + apptTime);

  var appt = {
    customer_id: custID,
    business_id: busID,
    start_time: apptTime,
    note: noteText
  };

  if (!(appt.customer_id && appt.business_id && appt.start_time && appt.note)) {
    alert("Please fill out all fields");
    return;
  }

  API.saveAppointment(appt).then(function() {
    location.reload();
  });
};

var deletedAppt = function(event) {
  event.preventDefault();
  var apptID = $(this).attr("data-id");
  console.log(apptID);
  API.deleteAppointment(apptID).then(function() {
    location.reload();
  });
};

var editedAppt = function(event) {
  event.preventDefault();
  var editID = $(this).attr("data-id");
  var newDate = $("#appt-date" + editID)
    .val()
    .trim();
  var newNote = $("#note" + editID)
    .val()
    .trim();
  console.log(editID + " " + newDate + " " + newNote);

  var appt = {
    id: editID,
    start_time: newDate,
    note: newNote
  };

  $.ajax({
    method: "PUT",
    url: "/api/appointments",
    data: appt
  }).then(function() {
    location.reload();
  });
};

$submitBtn.on("click", newAppointment);
$editBtn.on("click", editedAppt);
$cancBtn.on("click", deletedAppt);

// Time Loop Functionality
var time = function() {
  $("#displayTime").text(moment().format("LT"));
  setTimeout(time, 60000);
};

// Summary Tab Display Blocks
$("#displayMonth").text(moment().format("MMMM"));
$("#displayDate").text(moment().format("DD"));
$("#displayDay").text(moment().format("dddd"));
$("#displayTime").text(time);

// var Nexmo = require("nexmo");

// var nexmo = new Nexmo({
//   apiKey: "b37e4c38",
//   apiSecret: "3AFgADBLMvr9XrfY"
// });

// var from = "15053031062";
// var to = "19198699647";
// // var name = "David";
// // var companyName = "Duke Clinic";
// // var date = "Feb 4th";
// var text =
//   "Hello " +
//   name +
//   ",\n\nYour appointment has been booked at " +
//   date +
//   "." +
//   "\n\n- " +
//   companyName;

// nexmo.message.sendSms(from, to, text);
