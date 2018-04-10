$(document).ready(function() {

  $.getJSON("json/siteData.json?nocache=" + (new Date()).getTime(), function(file) {
    console.log(file);
    var data = file.elements;
    for (var i = 0; i < data.length; i++) {
      var float = "";
      if (data[i].float !== undefined && data[i].float === "right") {
        float = " right";
      } else if (data[i].float !== undefined && data[i].float === "center") {
        float = " center";
      }

      if (data[i].type === "sep" || data[i].link === undefined) {
        $('#links').append(
          "<div class=\"sep\"><div class=\"titleText noselect\">" + data[i].title + "</div></div>"
        );
      } else {
        $('#links').append(
          "<a target=\"_blank\" href=\"" + data[i].link + "\"><div id=\"rightBlock\" class=\"LinkHolder noHighlight" + float + "\">" + data[i].title + "<div class=\"linkIcon ease\"><img src=\"https://www.gtsailing.org/links/" + data[i].ico + "\" height=\"22px\" alt=\"" + data[i].title + "\" /></div</div></a>"
        );
      }
    }
    $('#footer span#version').html(' v' + file.version);
    $('#footer span#date').html((new Date()).getFullYear());
    if (file.banner.display == "yes") {
      $('#notice').css('display', 'block');
      $('#notice').css('color', file.banner.textcolor);
      $('#notice').css('background-color', file.banner.bgcolor);
      if (file.banner.link !== "") {
        $('#notice').html('<a target="_blank" href="' + file.banner.link + '">' + file.banner.text + "</a>");
      } else {
        $('#notice').html(file.banner.text);
      }

      if (file.banner.timeout !== undefined && parseInt(file.banner.timeout) != -1) {
        setTimeout(function() {
          $('#notice').css('display', 'none');
        }, parseInt(file.banner.timeout));
      }
    }
    var version = $('#html_version').text();
    if (file.html_version !== version) {
      bannerError(file.invalid_version_error);
    }
  }).fail(function(e) {
    bannerError('Client error: \"' + e.status + ' ' + e.statusText + '\". Please Reload.');
    console.log(e);
  });

  $.getJSON("https://script.google.com/macros/s/AKfycbybDJAuKgJI8PC8MHBIPUryvWMVS9_2XkYSUOvw7LOMNjKQVMKS/exec?req=fetch", function(file) {
    var leader = file;
    $('#links').append(
      "<div class=\"sep\"><div class=\"titleText noselect\">Leaderboard</div></div>"
    );
    var text = '<p style="margin-bottom:2px; font-weight:600;">Skippers:</p>';
    for (var i = 0; i < leader.skipper.length; i++) {
      text += (i + 1) + ": " + leader.skipper[i].name + " " + leader.skipper[i].val + "<br/>";
    }
    $('#links').append('<div style="float:left; font-weight:200; margin-left:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');

    var text = '<p style="margin-bottom:2px; font-weight:600;">Crew:</p>';
    for (var i = 0; i < leader.crew.length; i++) {
      text += (i + 1) + ": " + leader.crew[i].name + " " + leader.crew[i].val + "<br/>";
    }
    $('#links').append('<div style="float:right; font-weight:200; margin-right:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');

    var text = '<p style="margin-bottom:2px; font-weight:600;">Raceteam:</p>';
    for (var i = 0; i < leader.raceteam.length; i++) {
      text += (i + 1) + ": " + leader.raceteam[i].name + " " + leader.raceteam[i].val + "<br/>";
    }
    $('#links').append('<div style="float:left; font-weight:200; margin-left:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');

    var text = '<p style="margin-bottom:2px; font-weight:600;">Overall Members:</p>';
    for (var i = 0; i < leader.member.length; i++) {
      text += (i + 1) + ": " + leader.member[i].name + " " + leader.member[i].val + "<br/>";
    }
    $('#links').append('<div style="float:right; font-weight:200; margin-right:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');

    console.log("Ha. Nerd. -GT Exec");
    console.log('');
    console.log('Dehash (md5): 667e96841efd7a653610e2f3eba36b48');
    console.log('Solution has 14 lowercase letters only. Two words,\nno spaces. The solution\'s CRC32 is 0x12BC1CB9.');

  });

});

function bannerError(error) {
  $('#notice').css('display', 'block');
  $('#notice').css('color', 'white');
  $('#notice').css('background-color', 'red');
  $('#notice').html(error);
}