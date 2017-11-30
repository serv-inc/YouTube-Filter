"use strict";
// checks keywords against whitelist
/* jshint esversion: 6, strict: global */
/* jshint laxbreak: true */
/* globals chrome */
/* globals getSettings */
// licensed under the MPL 2.0 by (github.com/serv-inc)

chrome.runtime.onMessage.addListener(function(keywords, sender, sendResponse) {
  if ( ! getSettings().whitelistRegExp.test(keywords) ) {
    setBlockPage(sender, keywords);
  }
});

function setBlockPage(sender, keywords) {
  chrome.tabs.update(sender.tab.id,
		     {'url': chrome.extension.getURL('blockpage.html')
                      + '?' + encodeURIComponent(keywords)});
}
