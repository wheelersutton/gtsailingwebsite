$(document).ready(function() {

  $.getJSON("json/siteData.json?nocache=" + (new Date()).getTime(), function(file) {
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
        if (data[i].type === "weather") {
          var weather = $('<div id="weather"></div>');
          $('#links').append(weather);
          getWeather(weather, data[i]);
        } else if (data[i].type === "leaderboard") {
          var lb = $('<div id="leaderboard"></div>');
          $('#links').append(lb);
          getLeaderboard(lb, data[i]);
        } else {
          $('#links').append(
            "<a target=\"_blank\" href=\"" + data[i].link + "\"><div class=\"LinkHolder noHighlight" + float + "\">" + data[i].title + "<div class=\"linkIcon ease\"><img src=\"https://gtsailing.org/links/" + data[i].ico + "\" height=\"22px\" alt=\"" + data[i].title + "\" /></div</div></a>"
          );
        }
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
    /*var a = document.getElementsByTagName("a");
    for (var i = 0; i < a.length; i++) {
      a[i].onclick = function() {
        window.location = this.getAttribute("href");
        return false
      }
    }*/
  }).fail(function(e) {
    bannerError('Client error: \"' + e.status + ' ' + e.statusText + '\". Please Reload.');
    console.log(e);
  });

  function getWeather(attach, data) {
    if (data.hidden === "yes") {
      return;
    }
    if (!data.hasOwnProperty('station')) {
      data.station = "KGAFLOWE8";
    }
    //console.log(data.link + '?nocache=' + (new Date()).getTime() + '&station=' + data.station)
    $.getJSON(data.link + '?nocache=' + (new Date()).getTime() + '&station=' + data.station, function(result) {
      var obs = {};
      obs.obs_time = result.current_observation.observation_epoch;
      obs.request_time = result.current_observation.local_epoch;
      obs.retrieve_time = Math.round((new Date()).getTime() / 1000);
      obs.feels_like = result.current_observation.feelslike_f;
      obs.temp = result.current_observation.temp_f;
      obs.weather = result.current_observation.weather;
      obs.wind_dir = result.current_observation.wind_degrees;
      obs.wind_card = result.current_observation.wind_dir;
      obs.wind_speed = result.current_observation.wind_mph * 0.868976; // kts
      obs.wind_gust = result.current_observation.wind_gust_mph * 0.868976; // kts
      obs.url = result.current_observation.history_url;
      var container = $('<div class="weather_container"></div>')
      var temp = $('<div class="weather_temp"></div>').appendTo(container);
      temp.append('<div class="weather_temp_main">' + obs.temp + '<span>°F</span></div>');
      temp.append('<div class="weather_temp_feels">Feels Like ' + obs.feels_like + '<span>°F</span></div>');

      let temp_id = makeid();


      var wind = $('<div class="weather_wind"></div>').appendTo(container);
      var rose = $('<div class="weather_wind_rose"></div>');
      var rose_img = $('<img src="https://www.gtsailing.org/links/rose.svg" alt="Wind rose">').appendTo(rose);
      /*setInterval(function() {
        rose_img.css('transform', 'rotate(' + (obs.wind_dir + Math.random() * 4 - 1.5) + 'deg)');
      }, 250)*/
      rose_img.css('transform', 'rotate(' + obs.wind_dir + 'deg)');
      wind.append(rose);
      wind.append('<div class="wind_speed_text">' + (Math.round(obs.wind_speed * 10) / 10) + '<span>kts</span></div>');
      wind.append('<div class="weather_wind_text"><div class="wind_dir">Wind from <span>' + obs.wind_card + '</span></div><div class="wind_gusts">Gusts <span>' + (Math.round(obs.wind_gust * 10) / 10) + '</span> kts</div></div>');



      attach.append("<div class=\"sep\"><div class=\"titleText noselect\">" + data.title + "</div></div>");
      attach.append(container);
      attach.append('<div class="weather_sysn">' + obs.weather + '</div>');
      attach.append('<div class="weather_link"><a href="' + obs.url + '&apiref=b86500bfecb900b0" target="_blank">Full Station Weather</a> <span id="weather_timestamp' + temp_id + '">Last Updated: ' + getDifference(obs.retrieve_time, obs.obs_time) + ' ago</span></div>');
      setInterval(function() {
        // Recalculate the weather age every two seconds
        $('#weather_timestamp' + temp_id).html('Last Updated: ' + getDifference(Math.round((new Date()).getTime() / 1000), obs.obs_time) + ' ago')
      }, 2000);
    });
  }

  function getLeaderboard(attach, data) {
    attach.append(
      "<div class=\"sep\"><div class=\"titleText noselect\">" + data.title + "</div></div>"
    );
    if (data.hidden === "yes") {
      return;
    }
    $.getJSON(data.link, function(file) {
      var leader = file;
      var text = '<p style="margin-bottom:2px; font-weight:600;">Skippers:</p>';
      for (var i = 0; i < leader.skipper.length; i++) {
        if (leader.skipper[i].name !== '') {
          text += (i + 1) + ": " + sname(leader.skipper[i].name) + " " + leader.skipper[i].val + "<br/>";
        } else {
          text += (i + 1) + ": None<br/>";
        }

      }
      attach.append('<div style="float:left; font-weight:200; margin-left:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');

      var text = '<p style="margin-bottom:2px; font-weight:600;">Crew:</p>';
      for (var i = 0; i < leader.crew.length; i++) {
        if (leader.crew[i].name !== '') {
          text += (i + 1) + ": " + sname(leader.crew[i].name) + " " + leader.crew[i].val + "<br/>";
        } else {
          text += (i + 1) + ": None<br/>";
        }
      }
      attach.append('<div style="float:right; font-weight:200; margin-right:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');

      var text = '<p style="margin-bottom:2px; font-weight:600;">Raceteam:</p>';
      for (var i = 0; i < leader.raceteam.length; i++) {
        if (leader.raceteam[i].name !== '') {
          text += (i + 1) + ": " + sname(leader.raceteam[i].name) + " " + leader.raceteam[i].val + "<br/>";
        } else {
          text += (i + 1) + ": None<br/>";
        }
      }
      attach.append('<div style="float:left; font-weight:200; margin-left:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');

      var text = '<p style="margin-bottom:2px; font-weight:600;">Overall Members:</p>';
      for (var i = 0; i < leader.member.length; i++) {
        if (leader.member[i].name !== '') {
          text += (i + 1) + ": " + sname(leader.member[i].name) + " " + leader.member[i].val + "<br/>";
        } else {
          text += (i + 1) + ": None<br/>";
        }
      }
      attach.append('<div style="float:right; font-weight:200; margin-right:5px; width:170px; text-overflow: ellipsis;">' + text + '</div>');



      console.log("Ha. Nerd. -GT Exec");
      console.log('');
      console.log('Dehash (md5): 667e96841efd7a653610e2f3eba36b48');
      console.log('Solution has 14 lowercase letters only. Two words,\nno spaces. The solution\'s CRC32 is 0x12BC1CB9.');

    });
  }

});

function bannerError(error) {
  $('#notice').css('display', 'block');
  $('#notice').css('color', 'white');
  $('#notice').css('background-color', 'red');
  $('#notice').html(error);
}

// Shorten Name
function sname(name) {
  if (name.length > 16) {
    return name.substr(0, 14) + '...';
  } else {
    return name;
  }
}

function getDifference(request_time, obs_time) {
  var diff = request_time - obs_time;
  if (diff <= 60) {
    return (Math.round(diff * 10) / 10) + "s";
  } else if (diff <= 3600) {
    return (Math.round((diff / 60) * 10) / 10) + "m";
  } else if (diff <= 86400) {
    return (Math.round((diff / 3600) * 10) / 10) + "h";
  } else if (diff <= 604800) {
    return (Math.round((diff / 86400) * 10) / 10) + "d";
  } else {
    return (Math.round((diff / 604800) * 10) / 10) + "w";
  }
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}