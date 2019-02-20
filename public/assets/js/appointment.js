var $startTime = $("#appt-date");
var $submitBtn = $("#createAppt");
var $editBtn = $(".save-edit");
var $cancBtn = $(".delete");
var $custNote = $("#custNote");

var API = {
  saveAppointment: function(appt) {
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
  var custID = $("select.customerName")
    .find(":selected")
    .data("id");
  var custName = $("select.customerName")
    .find(":selected")
    .data("name");
  var custNum = $("select.customerName")
    .find(":selected")
    .data("num");

  var busName = $("#clientBusinessName").text();
  var busID = $(this).attr("data-id");
  var noteText = $custNote.val().trim();
  var apptTime = $startTime.val().trim();
  var slicedDate = $startTime
    .val()
    .slice(0, -8)
    .trim();
  var slicedTime = $startTime
    .val()
    .slice(-8)
    .trim();

  var appt = {
    customer_id: custID,
    customer_name: custName,
    customer_num: custNum,
    business_id: busID,
    business_name: busName,
    start_time: apptTime,
    sliced_date: slicedDate,
    sliced_time: slicedTime,
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
