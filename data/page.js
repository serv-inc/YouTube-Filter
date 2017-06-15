"use strict";
/* globals self */
/* globals unsafeWindow */
/* globals console */
// licensed under the MPL 2.0 by (github.com/serv-inc)
let ytplayer = unsafeWindow.ytplayer;

// td: better split here and send as array via JSON
function sendKeywords() {
    if ( typeof ytplayer !== "undefined" &&
	 ( ytplayer.config && 
	   ytplayer.config.args && 
	   typeof ytplayer.config.args.keywords !== "undefined" ) ) {
	self.port.emit('keywords', JSON.stringify(ytplayer.config.args.keywords));
    }
}

sendKeywords();

//// Youtube updates page without reload, watch for that, too
// courtesy of https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
let observer = new MutationObserver(function(mutations) {
    sendKeywords();
});

let config = { attributes: true,
	       childList: true,
	       characterData: true,
	       subtree: true };

observer.observe(document.body, config);

// redisable fullscreen
function disableFullscreen() {
    document.mozCancelFullScreen();
    document.webkitCancelFullScreen();
    document.safariCancelFullScreen();
    document.cancelFullScreen();
    console.log("fullscreen disabled by youtube-block-plugin (it does not allow filtering)");
}
document.addEventListener("mozfullscreenchange", function() {
    disableFullscreen();
});
