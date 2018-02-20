$( document ).ready(function() {

  $.getJSON( "json/siteData.json?nocache=" + (new Date()).getTime(), function( file ) {
    console.log(file);
    var data = file.elements;
    for(var i = 0; i < data.length; i++){
      var float = "";
      if(data[i].float !== undefined && data[i].float === "right"){
        float = " right";
      }else if(data[i].float !== undefined && data[i].float === "center"){
        float = " center";
      }

      if(data[i].type === "sep" || data[i].link === undefined){
        $('#links').append(
          "<div class=\"sep\"><div class=\"titleText noselect\">" + data[i].title + "</div></div>"
        );
      }else{
        $('#links').append(
          "<a target=\"_blank\" href=\"" + data[i].link + "\"><div id=\"rightBlock\" class=\"LinkHolder noHighlight" + float + "\">" + data[i].title + "<div class=\"linkIcon ease\"><img src=\"https://www.gtsailing.org/links/" + data[i].ico + "\" height=\"22px\" alt=\"" + data[i].title + "\" /></div</div></a>"
        );
      }
    }
    $('#footer span#version').html(' v' + file.version);
    $('#footer span#date').html((new Date()).getFullYear());
    if(file.banner.display == "yes"){
      $('#notice').css('display','block');
      $('#notice').css('color',file.banner.textcolor);
      $('#notice').css('background-color',file.banner.bgcolor);
      if(file.banner.link !== ""){
        $('#notice').html('<a target="_blank" href="'+file.banner.link+'">'+file.banner.text+"</a>");
      }else{
        $('#notice').html(file.banner.text);
      }

      if(file.banner.timeout !== undefined && parseInt(file.banner.timeout) != -1){
        setTimeout(function(){
          $('#notice').css('display','none');
        },parseInt(file.banner.timeout));
      }
    }
    var version = $('#html_version').text();
    if(file.html_version !== version){
      bannerError(file.invalid_version_error);
    }
  }).fail(function(e) {
    bannerError('Client error: \"' + e.status + ' ' + e.statusText + '\". Please Reload.');
    console.log(e);
  });

});

function bannerError(error){
  $('#notice').css('display','block');
  $('#notice').css('color','white');
  $('#notice').css('background-color','red');
  $('#notice').html(error);
}
