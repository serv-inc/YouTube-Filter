let ytplayer = unsafeWindow.ytplayer;

console.log('page');
if ( typeof ytplayer !== "undefined") {
    self.port.emit('keywords',
		   ( ytplayer.config && ytplayer.config.args &&
		     ytplayer.config.args.keywords)
		   || '');
} else {
    console.log('typeof ytplayer: ' + typeof ytplayer);
}
