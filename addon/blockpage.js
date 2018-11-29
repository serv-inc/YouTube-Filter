"use strict";
/* jshint esversion: 6, strict: global */
/* globals document */
/* globals URLSearchParams */
/* globals window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

/**
 * @fileoverview sets keywords from Url-part
 */

let params = new URLSearchParams(window.location.search);

// ====== set page ====  // fix this as it is known to content script
// document.getElementById("page").textContent = params.get("page");

// set keywords
if ( params.has("keywords") ) {
  const TAGS = document.getElementById("tags");
  //  TAGS.textContent = params.get("keywords");
  JSON.parse(params.get("keywords")).forEach((el) => {
    var item = document.createElement("li");
    item.className = "keyword";
    item.textContent = el;
    TAGS.appendChild(item);
  });
} else {
  document.getElementById("footer").textContent = "were empty.\nAllowed keywords:";
}

// set allowed
const WHITELIST = document.getElementById("allowed");

params.get("whitelist").split("|").forEach((el) => {
  var item = document.createElement("li");
  item.className = "keyword";
  item.textContent = el;
  WHITELIST.appendChild(item);
});


// tmp until history API to ignore last yt vid
// if ( window.history.length <= 2 ) {
//   document.getElementById("back").style.display = 'none';
// } else {
//   document.getElementById("back").onclick= () => window.history.go(2);
// }
