$(document).ready(function() {
  $("#app-details").on("click", function(event) {
    var radioValue = $("input[name='selectedCustomer']:checked").val();
    console.log(radioValue);
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "/api/customer-app",
      data: { customerId: radioValue }
    }).then(function(response) {
      $("#custApp").html(response);
    });
  });
});
