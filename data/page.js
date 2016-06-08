let ytplayer = unsafeWindow.ytplayer;

function sendKeywords() {
    if ( typeof ytplayer !== "undefined" &&
	 ( ytplayer.config && 
	   ytplayer.config.args && 
	   typeof ytplayer.config.args.keywords !== "undefined" ) ) {
	self.port.emit('keywords', JSON.stringify(ytplayer.config.args.keywords));
    }
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
