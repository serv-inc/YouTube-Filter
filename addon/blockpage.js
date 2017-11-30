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
  let append='';
  keywords.forEach((el) => {
    append += '<span class="keyword">' + el.replace(/\+/g, ' ') + '</span>';
  });
  document.getElementById("tags").innerHTML = append;
} else {
  document.getElementById("footer").textContent = "were empty.";
}

// tmp until history API to ignore last yt vid
// if ( window.history.length <= 2 ) {
//   document.getElementById("back").style.display = 'none';
// } else {
//   document.getElementById("back").onclick= () => window.history.go(2);
// }
