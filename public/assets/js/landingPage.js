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
  obj.bus_address = $("#clientAddress")
    .val()
    .trim();
  obj.bus_website = $("#clientWebsite")
    .val()
    .trim();
  obj.bus_number = $("clientNumber")
    .val()
    .trim();
  obj.first_apt = $("#clientFirstApp")
    .val()
    .trim();
  obj.last_apt = $("#clientLastApp")
    .val()
    .trim();
  obj.file = $("#exampleFormControlFile1")
    .val()
    .trim();
  $.ajax({
    method: "POST",
    url: "/signup",
    data: obj
  }).then(function(response) {
    if (response.message) {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: response.message
      });
    } else {
      window.location.replace("/client");
    }
  });
});

$("#clientLogin").on("click", function(event) {
  event.preventDefault();
  var login = {};
  login.email = $("#landingPageEmail")
    .val()
    .trim();
  login.password = $("#landingPagePassword")
    .val()
    .trim();
  $.ajax({
    method: "POST",
    url: "/signin",
    data: login
  }).then(function(response) {
    if (response.message) {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: response.message
      });
    } else {
      window.location.replace("/client");
    }
  });
});
