"use strict";
const self = require("sdk/self");
const Simple = require('sdk/simple-prefs');

let allowed = RegExp(Simple.prefs.allowKWRegex, "i");
Simple.on("allowKWRegex", function() {
    allowed = RegExp(Simple.prefs.allowKWRegex, "i");
});

let pm = require("sdk/page-mod").PageMod({
//    include: /.*/,
    include: /.*youtube.*/,
    contentScriptFile: "./page.js",
    onAttach: function(worker) {
	worker.port.on("keywords", function(keywords) {
	    // console.log('keywords: ' + keywords);

	    if ( keywords === '' && Simple.prefs.allowEmptyKW ) {
		return;
	    }
			    
	    if ( !allowed.test(keywords) ) {
                worker.tab.url = self.data.url("blocked.html") + '?' +
		    require("sdk/querystring").stringify({pageKeywords:
							  keywords});
	    }
	});
    }
});

