/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- BILLTUBE THEME CONFIGURATION ----- */
/* ----- Put this in your channel JS Before the module loader ----- */
/* ----- custom channel options ----- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.CustomPollSound = "https://cdn.discordapp.com/attachments/571767162314686466/1138261215739654164/brapreverb.ogg";

UI_ChannelName = 1;		
ChannelName_Caption = 'Roberts Kinoplex';

UI_ChannelAnnouncement = 0;	
ChannelAnnouncement_Title = 'custom announcement';
ChannelAnnouncement_HTML = '<center>This is a custom channel announcement!</center>';

UI_Discord = 0;	
Discord_NAME = 'name';
Discord_URL = 'https://discord.gg/7z2eZvUFDj';

UI_Favicon = 0;			//only enable when you have a valid url in favicon_url field
Favicon_URL = 'favicon url';

/* ----- Custom variables (not BillTube) ----- */
window["EMOTESPERLINE"] = 3; //max number of emotes per message. 0 = disable emotes

/* ----- Channel guide ----- */
/* ----- requires themoviedb.org account----- */
var moviedbshow = 0;
var moviedbkey = 'api key';
var moviedblist = 'list key';

/* ----- video player ----- */
var Poster_URL= ''; //this has to be a valid Jpg or png

/* ----- channel background ----- */
var BG_Dimmed = 0;
var BGPics = ['https://cdn.imgchest.com/files/my8xcmrrzq4.png'];   //open and close the image with ' '
var BG_Stock= 0; //uses the stock wallpapers and bgpics won't be used


/* ----- channels slider ----- */
var UI_ChannelList= 0; // only enable if you have a valid json that looks exactly like mine
var Channel_JSON = 'https://cdn.jsdelivr.net/gh/BillTube/BillTube2/channels.json';

/* ----- Do Not Touch ----- */
/*!
**|   XaeMae Sequenced Module Loader
**|   
**@preserve
*/
// -- Channel Namespace --
if (!this[CHANNEL.name])
    this[CHANNEL.name] = {};
// -- The Module Library
window[CHANNEL.name].sequenceList = {
  'BillTube':  { active: 1, rank: -1, url: "https://deerfarce.github.io/BillTube2.custom.test.min.js",       callback: true },
  'nnd':       { active: 1, rank: -1, url: "https://deerfarce.github.io/cytube-nnd-chat-custom.js",     callback: true },
  'emotebtn':  { active: 1, rank: -1, url: "https://deerfarce.github.io/etc/ce/ce_old-emote-button.js", callback: true },
  'fxbtn':     { active: 1, rank: -1, url: "https://deerfarce.github.io/etc/ce/ce_emote-fx-button.js",  callback: true },
  'scrollfix': { active: 1, rank: -1, url: "https://deerfarce.github.io/etc/chatscrollfix.js",          callback: true },
  'emotelimit':{ active: 1, rank: -1, url: "https://deerfarce.github.io/etc/cytube-emote-limiter_fx.js",   callback: true }
};
window[CHANNEL.name].sequencePrev = window[CHANNEL.name].sequencePrev || "";
window[CHANNEL.name].sequenceState = window[CHANNEL.name].sequenceState || 0;
window[CHANNEL.name].sequenceIndex = Object.keys(window[CHANNEL.name].sequenceList)

window[CHANNEL.name].sequencerLoader = function (){
    // After first run we curry the previous modules callback
    // This is mainly used to reassign variables in modules/scripts that don't use module options
    if(window[CHANNEL.name].sequencePrev){
        setTimeout(window[CHANNEL.name].sequenceList[window[CHANNEL.name].sequencePrev].callback, 0)
        window[CHANNEL.name].sequencePrev = "";
    }

    if(window[CHANNEL.name].sequenceState >= window[CHANNEL.name].sequenceIndex.length){
        return (function(){
            console.log("Xaekai's Script Sequencer: Loading Complete.");
            //this part is NOT Xaekai's, don't bother him if this breaks or whatever
            $('.navbar li a[href="/"]').text("Other Channels")
            if (!document.getElementById("DiscIcon")) {
                $("<li/>").append($("<button/>", {id:"DiscIcon", 'data-tooltip':"Discord", 'data-tooltip-pos': 'left', 'aria-hidden':'true', style:'background: none;border: 0;top: 13px;'}).append($("<img/>", {src:"https://cdn.imgchest.com/files/myd5cpa28w4.png", style:"height:2em;"}))).appendTo($("#nav-collapsible .navbar-nav"))
                
                $("#DiscIcon").on("click", function() {
                    if (null != Discord_URL && /^https\:\/\/discord\.gg\//i.test(Discord_URL)) {
                        window.open(Discord_URL, '_blank');
                    }
                })
            }
            //end custom part
        })()
    }

    var currKey = window[CHANNEL.name].sequenceIndex[window[CHANNEL.name].sequenceState];
    if(window[CHANNEL.name].sequenceState < window[CHANNEL.name].sequenceIndex.length){
        if(window[CHANNEL.name].sequenceList[currKey].active
            && window[CHANNEL.name].sequenceList[currKey].rank <= CLIENT.rank
        ){
            console.log("Xaekai's Script Sequencer: Loading " + currKey);
            window[CHANNEL.name].sequencePrev = currKey;
            window[CHANNEL.name].sequenceState++;
            $.getScript(window[CHANNEL.name].sequenceList[currKey].url, window[CHANNEL.name].sequencerLoader)
        } else {
            window[CHANNEL.name].sequenceState++;
            window[CHANNEL.name].sequencerLoader()
        }
    }
};window[CHANNEL.name].sequencerLoader()

function autoAcceptEmbed() {
    if (!window["AUTOEMBED"]) return;
    if ($('.queue_active').attr('title')?.split("Added by: ")[1].toLowerCase() !== "robert-kinoplex") return;
    setTimeout(()=>{
        $("#ytapiplayer .alert button:contains('Embed')").click();
    }, 1000);
}

if (!window.hasOwnProperty("ONCE")) window["ONCE"] = {};
if (!window.hasOwnProperty("AUTOEMBED")) window["AUTOEMBED"] = true;

if (!window.ONCE["autoEmbed"]) {
    window.ONCE["autoEmbed"] = true;
    socket.on("changeMedia", (data)=>{
        if (data["meta"] && data.meta["embed"]) {
            autoAcceptEmbed();
        }
    });
}

autoAcceptEmbed();

Callbacks.updatePoll = function(data) {
    var poll = $("#pollwrap .active");
    var i = 0;
    poll.find(".option button").each(function() {
        $(this).html("$" + (data.counts[i]*10));
        i++;
    });
}

function FixPoll(data) {
  var poll = $("#pollwrap .active");
  var buttons = $("#pollwrap .active .option button");
  
  if (poll.length <= 0 || buttons.length <= 0 || ~buttons[0].innerText.indexOf("$")) {
    return;
  }
  
  var text = "";
  buttons.each(function() {
    text = $(this).text();
    if (!text || ~text.indexOf("$") || isNaN(parseInt(text))) return;
    $(this).text("$" + (parseInt(text)*10));
  });
}
FixPoll();
socket.on("newPoll", FixPoll);