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

  $.getJSON("https://script.googleusercontent.com/macros/echo?user_content_key=blgPgXi-TNQBGUuM-SDZml3O2-NsRfucA79IWkER5FPN4a4gJ0YTXqfUBX4R7HCWj4tVyftyZ3IQjVJH_8dqmr5DNQc0kMklm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnH1Vt3Uy4jbLsHQCvQKsR16qdlN7Sf9g7tbbTRWe5RPbM6kyfY_6UK34NjEoAWiFjw&lib=Mt6jOg-0Z7s9-stk-ozcAjbUc_Q5CG5v6", function(file) {
    var leader = file;
    $('#links').append(
      "<div class=\"sep\"><div class=\"titleText noselect\">Leaderboard</div></div>"
    );
    var text = '<p style="margin-bottom:2px; font-weight:600;">Skippers:</p>';
    for (var i = 0; i < leader.skipper.length; i++) {
      text += (i + 1) + ": " + leader.skipper[i].name + " (" + leader.skipper[i].val + ")<br/>";
    }
    $('#links').append('<div style="float:left; font-weight:200; margin-left:5px;">' + text + '</div>');

    var text = '<p style="margin-bottom:2px; font-weight:600;">Crew:</p>';
    for (var i = 0; i < leader.crew.length; i++) {
      text += (i + 1) + ": " + leader.crew[i].name + " (" + leader.crew[i].val + ")<br/>";
    }
    $('#links').append('<div style="float:right; font-weight:200; margin-right:5px;">' + text + '</div>');

    var text = '<p style="margin-bottom:2px; font-weight:600;">Overall Members:</p>';
    for (var i = 0; i < leader.member.length; i++) {
      text += (i + 1) + ": " + leader.member[i].name + " (" + leader.member[i].val + ")<br/>";
    }
    $('#links').append('<div style="float:left; font-weight:200; margin-left:5px;">' + text + '</div>');



  });

});

function bannerError(error) {
  $('#notice').css('display', 'block');
  $('#notice').css('color', 'white');
  $('#notice').css('background-color', 'red');
  $('#notice').html(error);
}