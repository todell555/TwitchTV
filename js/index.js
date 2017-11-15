var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

var names = "";
var logos = "";
var links = "";
var status = "";
var games = "";
var desc = "";
getTwitch(0);

function getTwitch(i){
  if(i == channels.length)
    return;
  var stream = "https://wind-bow.gomix.me/twitch-api/streams/";
  var channel = "https://wind-bow.gomix.me/twitch-api/channels/";
  channel += channels[i];
  stream += channels[i];
  channel += "?callback=?";
  stream += "?callback=?";

    $.getJSON(channel, function(e){
      $.getJSON(stream,function(f){
        getOfflineData(e);
        getOnlineData(f);
        setData(i);
        getTwitch(i+1);
      });
      
    });
}

function getOfflineData(e){
  names = e.name;
  logos = e.logo;
  links = e.url;
}

function setData(i){
  if(names == undefined){
    names = streamers[i];
    games = "User not found!";
    links = "#";
    logos = "#";
  }
  content = "<div class='row "+status+"'><div class='col col-4'>";
  content += "<img class='logo' src='"+logos+"'></img>";
  content += "<p class='text'><a href='"+links+"' target='_blank'>"+names+"</a></p></div>";
  content += "<div class='col col-8'><p class='text'>"+games+"<span class='hidden-sm-down'>"+desc+"</span></p></div>";
  content += "</div>";
  $('.mid').append(content);
}

function getOnlineData(f){
  if(f.stream == null){
    status = "offline";
    games = "offline";
    desc = "";
  }
  else{
    status = "online";
    games = f.stream.game;
    desc = ": "+f.stream.channel.status;
  }
}