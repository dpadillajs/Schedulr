var $customer = $("#customer");
var $startTime = $("#appt-date");
var $note = $("#note");
var $submitBtn = $("#submit");
var $cancBtn = $(".delete");

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
  console.log($startTime.val());
  console.log("saving - newAppt 1");

  var appt = {
    customer_id: $customer.val().trim(),
    business_id: $submitBtn.attr("data-id"),
    start_time: $startTime.val().trim(),
    note: $note.val().trim()
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

$submitBtn.on("click", newAppointment);

$cancBtn.on("click", deletedAppt);
