"use strict";
const self = require("sdk/self");
const PM = require("sdk/page-mod");
const Simple = require('sdk/simple-prefs');

// should restart mod each time, but reloads should mitigate this for now
let allowed = RegExp(Simple.prefs.allowKWRegex, "i");
Simple.on("allowKWRegex", function() {
    allowed = RegExp(Simple.prefs.allowKWRegex, "i");
});
let blocked = RegExp(Simple.prefs.blockKWRegex, "i");
Simple.on("blockKWRegex", function() {
    blocked = RegExp(Simple.prefs.blockKWRegex, "i");
});
let empty_ok = Simple.prefs.allowEmptyKW;
Simple.on("allowEmptyKW", function() {
    empty_ok = Simple.prefs.allowEmptyKW;
});

let pm = PM.PageMod({
//    include: /.*/,
    include: /.*youtube.*/,
    contentScriptFile: "./page.js",
    onAttach: function(worker) {
	worker.port.on("keywords", function(keywords) {
	    //	    console.log('keywords: ' + keywords);
	    keywords = JSON.parse(keywords);

	    if ( keywords === '' && empty_ok ) {
		return;
	    }
			    
	    if ( blocked.test(keywords) && !allowed.test(keywords) ) {
                worker.tab.url = self.data.url("blocked.html") + '?' +
		    require("sdk/querystring").stringify({pageKeywords:
							  keywords});
	    }
	});
    }
});

let blockV = PM.PageMod({
    include: /.*youtube\.com\/(v|embed)\/.*/,
    attachTo: ["top"],
    onAttach: function(worker) {
        worker.tab.url = self.data.url("blocked_v.html");
    }
});
