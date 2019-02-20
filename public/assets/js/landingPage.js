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

// Smooth Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});
