// Keep tab open on page reload

$("#myTab a").click(function(e) {
  e.preventDefault();
  $(this).tab("show");
});

// store the currently selected tab in the hash value
$("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
  var id = $(e.target)
    .attr("href")
    .substr(1);
  window.location.hash = id;
});

// on load of the page: switch to the currently selected ta
var hash = window.location.hash;
if (!hash) {
  $("#summary").addClass("active");
  $("#summary-tab").addClass("active");
} else {
  $(hash + "-tab").tab("show");
  $("" + hash).addClass("active");
  $(hash + "-tab").addClass("active");
}
