"use strict";

import { Dispatcher } from "flux"

// Create dispatcher instance
let AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function(action) {
  this.dispatch({
    source: "VIEW_ACTION",
    action: action
  });
}

export default AppDispatcher;