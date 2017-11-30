"use strict";
/* jshint esversion: 6, strict: global */
/* globals $ */
/* globals chrome */
/* globals document */
/* globals window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

// hack: chromium does not update ytplayer.config.args.keywords on new video
let div = $("<div>");
div.load(window.location.href, (response, status, xhr) => {
  let pos = div.text().indexOf("keywords");
  pos = div.text().indexOf(":", pos);
  pos = div.text().indexOf('"', pos) +1;
  let keywords = div.text().slice(pos, div.text().indexOf('"', pos));
  chrome.runtime.sendMessage(keywords);
});


function disableFullscreen() {
    document.mozCancelFullScreen();
    document.webkitCancelFullScreen();
    document.safariCancelFullScreen();
    document.cancelFullScreen();
    //console.log("fullscreen disabled by youtube-block-plugin (fullscreen does not set keywords)");
}
document.addEventListener("mozfullscreenchange", function() {
    disableFullscreen();
});
document.addEventListener("fullscreenchange", function() {
    disableFullscreen();
});
