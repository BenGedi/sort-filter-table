var Reflux  = require("reflux");
var moment  = require("moment");
var Actions = require("../actions/actions.js");
var UTILS   = require("../utils/utils.js")
var _       = require("lodash");


var SearchStore = Reflux.createStore({

	mixins: [],

	listenables: [Actions],

	domainState: {
	},

	UIState: {
		table:{
			isRender: true,
			data: [
				{
					file_name: "storage.json",
					file_size: "3MB",
					date: {
						time: UTILS.setFormatDateTime(new Date("May 13 2015")),
						timeInMilliseconds: new Date("May 13 2015").getTime()
					},
					clients: ["Microsoft","Google","Facebook","Avg","Amazon","Ebay","Amdocs","Nice","Verint","EMC"]
				},
				{
					file_name: "accounts.json",
					file_size: "2MB",
					date: {
							time: UTILS.setFormatDateTime(new Date("January 25 2015")),
							timeInMilliseconds: new Date("January 25 2015").getTime()
					},
					clients: ["Microsoft","Facebook","Ebay","Verint","Marvell","Cisco"]
				},
				{
					file_name: "managers.json",
					file_size: "1MB",
					date: {
						time: UTILS.setFormatDateTime(new Date("January 18 2015")),
						timeInMilliseconds: new Date("January 18 2015").getTime()
					},
					clients: ["Amazon","Ebay","Amdocs","Nice","Verint","EMC"]
				},
				{
					file_name: "attacks.json",
					file_size: "10MB",
					date: {
						time: UTILS.setFormatDateTime(new Date("April 19 2016")),
						timeInMilliseconds: new Date("April 19 2016").getTime()
					},
					clients: ["Nice","Microsoft","Amazon","Marvell","Cisco"]
				}
			]
		}
	},

	init: function() {
	},
	getInitialState: function() {
        return this.UIState;
    }

	// ACTIONS
});

module.exports = SearchStore;
