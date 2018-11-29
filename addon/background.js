"use strict";
// checks keywords against whitelist
/* jshint esversion: 6, strict: global */
/* jshint laxbreak: true */
/* globals chrome */
/* globals getSettings */
/* globals URLSearchParams */
// licensed under the MPL 2.0 by (github.com/serv-inc)

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (typeof(changeInfo.url) !== "undefined") {
      //alert(changeInfo.url);
      if (/http.:.*youtube.com/.test(changeInfo.url)) {
        chrome.tabs.executeScript({file: "get-keywords.js"});
      }
    }
  }
);

chrome.runtime.onMessage.addListener(function(keywords, sender, sendResponse) {
  if ( ! /\/(channel|user)\//.test(sender.url)
       && keywords.length > 0  // some day re-make as config if exclude empty
       && ! getSettings().whitelistRegExp.test(keywords) ) {
    setBlockPage(sender, keywords);
  }
});

function setBlockPage(sender, keywords) {
  var params = new URLSearchParams();
  params.append("keywords", keywords);
  params.append("whitelist", getSettings().whitelist);
  params.append("page", sender.url);
  chrome.tabs.update(sender.tab.id,
		     {'url': chrome.extension.getURL('blockpage.html')
                      + '?' + params.toString()});
}
