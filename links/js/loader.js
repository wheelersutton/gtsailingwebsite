$(document).ready(function() {
  console.log("Init links elements");
  $('head').append('<script src="js/cdn.js?nocache=' + (new Date()).getTime() + '"></script>');
  $('head').append('<link rel="stylesheet" type="text/css" href="css_new.css?nocache=' + (new Date()).getTime() + '"></link>');
  $('#js_notice').css('display', 'none');
});