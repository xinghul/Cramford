+function(undefined) {
  "use strict";

  var keyMirror = require("fbjs/lib/keyMirror");

  module.exports = keyMirror({
    CART_ADD: null,
    CART_REMOVE: null,
    CART_VISIBLE: null,
    SET_SELECTED: null,
    RECEIVE_DATA: null
  });
}();
