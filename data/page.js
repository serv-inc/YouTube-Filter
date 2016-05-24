let ytplayer = unsafeWindow.ytplayer;

let location = document.location.href;

function sendKeywords() {
    if ( typeof ytplayer !== "undefined") {
	self.port.emit('keywords',
		       ( ytplayer.config && ytplayer.config.args &&
			 ytplayer.config.args.keywords) ||
		       '');
    }//  else {
    // console.log('typeof ytplayer: ' + typeof ytplayer);
    // }
}

sendKeywords();

// courtesy of https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
let observer = new MutationObserver(function(mutations) {
    sendKeywords();
});

let config = { attributes: true,
	       childList: true,
	       characterData: true,
	       subtree: true };

observer.observe(document.body, config);
