"use strict";
/** @fileoverview extract keywords from location */
/* jshint esversion: 6, strict: global */
/* globals chrome, document, XMLHttpRequest, window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

// hack: chromium does not update ytplayer.config.args.keywords on new video
// alert( window.location.href );  // test correct page
var xhr = new XMLHttpRequest();
xhr.onload = function() {
  chrome.runtime.sendMessage(JSON.stringify(
    {
      "keywords": getKeywords(this.responseText),
      "page": window.location.href
    }));
};
xhr.open("GET", window.location.href);
xhr.send();


function getKeywordsAt(text, position) {
  text = text.slice(position);
  let start = text.indexOf("[");
  let end = text.indexOf("]") +1;
  return text.slice(start, end);
}


/** @return keywords in HTML text */
function getKeywords(text) {
//  alert(getKeywordsAt(text, text.lastIndexOf("keywords")));
  return getKeywordsAt(text, text.lastIndexOf("keywords"));
}

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
