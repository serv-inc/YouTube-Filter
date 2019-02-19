"use strict";
/* jshint esversion: 6, strict: global */
/* globals document, URLSearchParams, window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

/**
 * @fileoverview sets keywords from Url-part
 */

let params = new URLSearchParams(window.location.search);


// ====== set page ====  
// TODO [#S] fix this as it is known to content script
// document.getElementById("page").textContent = params.get("page");

/** adds list item with text <code>name</code> to parent <code>addTo</code> */
function addLi(content, addTo) {
    var item = document.createElement("li");
    item.className = "keyword";
    item.textContent = content;
    addTo.appendChild(item);
}

// set keywords - is not a regex, so needs to be treated differently
if ( params.has("keywords") ) {
  const TAGS = document.getElementById("keywords");
  //  TAGS.textContent = params.get("keywords");
  JSON.parse(params.get("keywords")).forEach((el) => addLi(el, TAGS));
} else {
  document.getElementById("footer").textContent = "were empty.\nAllowed keywords:";
}

/** adds search parameters of <code>ulName</code> to same name (ul)element */
function addUl(ulName) {
  const TARGET = document.getElementById(ulName);  
  params.get(ulName).split("|").forEach((el) => addLi(el, TARGET));
}

addUl("whitelist");
addUl("blacklist");


// tmp until history API to ignore last yt vid
// if ( window.history.length <= 2 ) {
//   document.getElementById("back").style.display = 'none';
// } else {
//   document.getElementById("back").onclick= () => window.history.go(2);
// }
