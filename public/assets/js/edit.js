var $startTime = $("#appt-date");
var $note = $("#note");
var $id = $("#id");
var $submitBtn = $("#submit");

var editedAppt = function() {
  event.preventDefault();

  var appt = {
    id: $id.attr("data-id"),
    start_time: $startTime.val().trim(),
    note: $note.val().trim()
  };
  console.log(appt);
  $.ajax({
    method: "PUT",
    url: "/api/appointments",
    data: appt
  }).then(function() {
    //need to update this to redirect to dashboard, or
    //reload dashboard window
    window.location.href = "/client/" + 2;
  });
};

$submitBtn.on("click", editedAppt);
