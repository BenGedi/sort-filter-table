var Reflux  = require("reflux");
var moment  = require("moment");
var Actions = require("../actions/actions.js");
var UTILS   = require("../utils/utils.js")
var _       = require("lodash");


var SearchStore = Reflux.createStore({

	mixins: [],

	listenables: [Actions],

	UIState: {
		filter: {
			isActive: false
		}
	},

	init: function() {

	},

	getInitialState: function() {

        return this.UIState;
    },

    //ACTIONS

    onToggleFilter: function(){
    	this.UIState.filter.isActive = !this.UIState.filter.isActive;
    	this.trigger(this.UIState);
    }
});

module.exports = SearchStore;
