(function(undefined) {
    "use strict";

    var _            = require("underscore"),
        EventEmitter = require("events").EventEmitter;

    var AppDispatcher     = require("../dispatcher/AppDispatcher"),
        FluxCartConstants = require("../constants/FluxCartConstants");
    

    // Define initial data points
    var CHANGE_EVENT = "change",
        _product     = {}, 
        _selected    = null;

    // Method to load product data from mock API
    function loadProductData(data) {
        _product  = data[0];
        _selected = data[0].variants[0];
    }

    // Method to set the currently selected product variation
    function setSelected(index) {
        _selected = _product.variants[index];
    }


    // Extend ProductStore with EventEmitter to add eventing capabilities
    var ProductStore = _.extend({}, EventEmitter.prototype, {

        // Return Product data
        getProduct: function() {
            return _product;
        },

        // Return selected Product
        getSelected: function(){
            return _selected;
        },

        // Emit Change event
        emitChange: function() {
            this.emit(CHANGE_EVENT);
        },

        // Add change listener
        addChangeListener: function(callback) {
            this.on(CHANGE_EVENT, callback);
        },

        // Remove change listener
        removeChangeListener: function(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        }

    });

    // Register callback with AppDispatcher
    AppDispatcher.register(function(payload) {
        var action = payload.action;
        var text;

        switch(action.actionType) {

            // Respond to RECEIVE_DATA action
            case FluxCartConstants.RECEIVE_DATA:
                loadProductData(action.data);
                break;

            // Respond to SELECT_PRODUCT action
            case FluxCartConstants.SELECT_PRODUCT:
                setSelected(action.data);
                break;

            default:
                return true;
        }

        // If action was responded to, emit change event
        ProductStore.emitChange();

        return true;
    });

    module.exports = ProductStore;

})();
