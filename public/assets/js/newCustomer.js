$("#createCustomer").on("click", function(event) {
  event.preventDefault();
  var newCustomer = {};
  var address = "";
  newCustomer.email = $("#custEmail")
    .val()
    .trim();
  newCustomer.password = $("#custPassword")
    .val()
    .trim();
  newCustomer.firstName = $("#custFirstName")
    .val()
    .trim();
  newCustomer.lastName = $("#custLastName")
    .val()
    .trim();
  newCustomer.mName = $("#custMiddleName")
    .val()
    .trim();
  newCustomer.age = $("#custAge")
    .val()
    .trim();
  newCustomer.gender = $("#custGender option:selected").val();
  newCustomer.phone = $("#custNumber")
    .val()
    .trim();
  address +=
    $("#custAddress")
      .val()
      .trim() + " ";
  address +=
    $("#custSecondaryAddress")
      .val()
      .trim() + " ";
  address +=
    $("#custCity")
      .val()
      .trim() + " ";
  address += $("#custState option:selected").val() + " ";
  newCustomer.address = address;
  newCustomer.zipcode = $("#custZipCode")
    .val()
    .trim();
  $.ajax({
    method: "POST",
    url: "/api/new-customer",
    data: newCustomer
  }).then(function(response) {
    var alertmessage = "";
    console.log(response.errors);
    if (response.errors) {
      response.errors.forEach(function(element) {
        alertmessage +=
          "<p>Please, check your " + element.path + ". It is not valid.</p>";
      });
      Swal.fire({
        type: "error",
        title: "Oops...",
        html: alertmessage
      });
    } else {
      Swal.fire({
        title: "A new customer has been added!",
        showConfirmButton: true
      }).then(function() {
        location.reload();
      });
    }
  });
});
