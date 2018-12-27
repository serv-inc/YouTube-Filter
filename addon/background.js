"use strict";
/** @fileoverview checks youtube-keywords against whitelist */
/* jshint esversion: 6, strict: global, laxbreak: true */
/* globals chrome, getSettings, URLSearchParams */
// licensed under the MPL 2.0 by (github.com/serv-inc)

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (typeof(changeInfo.url) !== "undefined") {
      //alert(changeInfo.url);
      if (/http.:.*youtube.com/.test(changeInfo.url)) {
        chrome.tabs.executeScript(tabId, {file: "/get-keywords.js"});
      }
    }
  }
);

// sent by get-keywords.js
chrome.runtime.onMessage.addListener(function(json, sender, sendResponse) {
  let result = JSON.parse(json);
  console.error(result);
  if ( ! /\/(channel|user)\//.test(sender.url)
       && result.keywords.length > 0
       && ! getSettings().whitelistRegExp.test(result.keywords) ) {
    setBlockPage(sender, result.keywords);
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
