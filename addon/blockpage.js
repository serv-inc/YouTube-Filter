"use strict";
/* jshint esversion: 6, strict: global */
/* globals document */
/* globals window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

/**
 * @fileoverview sets keywords from Url-part
 */

let keywords = decodeURIComponent(window.location.search.slice(1)).split(',');
if ( keywords ) {
  const TAGS = document.getElementById("tags");
  keywords.forEach((el) => {
    var span = document.createElement("span");
    span.className = "keyword";
    span.textContent = el.replace(/\+/g, ' ');
    TAGS.appendChild(span);
  });
} else {
  document.getElementById("footer").textContent = "were empty.";
}

// tmp until history API to ignore last yt vid
// if ( window.history.length <= 2 ) {
//   document.getElementById("back").style.display = 'none';
// } else {
//   document.getElementById("back").onclick= () => window.history.go(2);
// }
