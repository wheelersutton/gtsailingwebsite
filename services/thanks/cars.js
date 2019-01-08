var loc1 = -400 * Math.random() - 100;
var loc2 = -400 * Math.random() - 100;
var loc3 = -400 * Math.random() - 100;

$(document).ready(() => {
  // console.log('test');
  // $('.car').css('bottom', ($('#footer').outerHeight()-4) + 'px');
  setInterval(processCars, 450);
});

$(window).resize(function() {
  $('.car').css('bottom', ($('#footer').outerHeight() - 4) + 'px');
});

function processCars() {
  if (document.hasFocus()) {
    var width = $(window).width() + 100;
    $('#car1').css('left', loc1 + 'px');
    $('#car2').css('left', loc2 + 'px');
    $('#car3').css('left', loc3 + 'px');
    if (loc1 > width) {
      loc1 = -100 + Math.random() * 50 - 20;
      $('#car1').css('left', loc1 + 'px');
      $('#car1').css('transition', 'left 0s');
    } else {
      $('#car1').css('transition', 'left 0.5s');
    }
    if (loc2 > width) {
      loc2 = -10 + Math.random() * 50 - 200;
      $('#car2').css('left', loc2 + 'px');
      $('#car2').css('transition', 'left 0s');
    } else {
      $('#car2').css('transition', 'left 0.5s');
    }
    if (loc3 > width) {
      loc3 = -10 + Math.random() * 50 - 200;
      $('#car3').css('left', loc3 + 'px');
      $('#car3').css('transition', 'left 0s');
    } else {
      $('#car3').css('transition', 'left 0.5s');
    }
    loc1 += 100 + Math.random() * 15;
    loc2 += 150 + Math.random() * 15;
    loc3 += 50 + Math.random() * 15;
  }
}