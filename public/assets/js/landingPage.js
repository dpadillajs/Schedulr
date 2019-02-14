$("#clientSignup").on("click", function(event) {
  event.preventDefault();
  var obj = {};
  obj.email = $("#clientEmail")
    .val()
    .trim();
  obj.password = $("#clientPassw")
    .val()
    .trim();
  obj.bus_name = $("#clientName")
    .val()
    .trim();
  obj.first_apt = $("#clientFirstApp")
    .val()
    .trim();
  obj.last_apt = $("#clientLastApp")
    .val()
    .trim();
  $.ajax({
    method: "POST",
    url: "/signup",
    data: obj
  }).then(function(response) {
    if (response.id) {
      window.location.replace("/client/" + response.id);
    }
    if (response.message) {
      alert(response.message);
    }
  });
});
