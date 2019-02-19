"use strict";
/* jshint esversion: 6, strict: global */
/* globals document, URLSearchParams, window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

/**
 * @fileoverview sets keywords, white- and blacklist from Url-search-params
 */
let params = new URLSearchParams(window.location.search);

/** adds list item with text <code>name</code> to parent <code>addTo</code> */
function addLi(content, addTo) {
    var item = document.createElement("li");
    item.className = "keyword";
    item.textContent = content;
    addTo.appendChild(item);
}
/** adds search parameters of <code>ulName</code> regex to same-name-id ul */
function addUl(ulName) {
  const TARGET = document.getElementById(ulName);
  params.get(ulName).split("|").forEach((el) => addLi(el, TARGET));
}

// set keywords - is not a regex, so needs to be treated differently
const TAGS = document.getElementById("keywords");
JSON.parse(params.get("keywords")).forEach((el) => addLi(el, TAGS));

addUl("whitelist");
addUl("blacklist");
