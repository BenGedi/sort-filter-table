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
			isRender: false,
			clients: {
				isRender: false,
				data: []
			},
			headers: [],
			data: [
				{
					file_name: "storage.json",
					file_size: 3,
					date: {
						time: UTILS.setFormatDateTime(new Date("May 13 2015")),
						timeObject: new Date("May 13 2015")
					},
					clients: {
						isActive: false,
						data:["Microsoft","Google","Facebook","Avg","Amazon","Ebay","Amdocs","Nice","Verint","EMC"]

					}
				},
				{
					file_name: "accounts.json",
					file_size: 2,
					date: {
							time: UTILS.setFormatDateTime(new Date("January 25 2015")),
							timeObject: new Date("January 25 2015")
					},
					clients: {
						isActive: false,
						data:["Microsoft","Facebook","Ebay","Verint","Marvell","Cisco"]
					}
				},
				{
					file_name: "managers.json",
					file_size: 1,
					date: {
						time: UTILS.setFormatDateTime(new Date("January 18 2015")),
						timeObject: new Date("January 18 2015")
					},
					clients: {
						isActive: false,
						data: ["Amazon","Ebay","Amdocs","Nice","Verint","EMC"]
					}
				},
				{
					file_name: "attacks.json",
					file_size: 10,
					date: {
						time: UTILS.setFormatDateTime(new Date("April 19 2016")),
						timeObject: new Date("April 19 2016")
					},
					clients: {
						isActive: false,
						data: ["Nice","Microsoft","Amazon","Marvell","Cisco"]
					}
				}
			]
		}
	},

	init: function() {

	},
	getInitialState: function() {
		// merge all clients from all files
		this.initMergeArrays(this.UIState.table.data);
		// create table headers by the json keys
		this.initTableHeaders(this.UIState.table.data);

		this.initSortTable(this.UIState.table.data, "file_name");
        return this.UIState;
    },

    initSortTable: function(data, prop){
		this.UIState.table.headers.forEach(function(item ,i){
    		if(item.value !== prop) {
    			item.isSorted = false;
    			item.sortBy = "";
    		}
    		else if(item.value === prop && item.isSorted === true) {

    			var sortType = {
    				ascending: function (){
						this.UIState.table.data = _.sortBy(data, prop).reverse();
    				},
    				descending: function(){
    					this.UIState.table.data = _.sortBy(data, prop);
    				}
    			}
    			sortType[item.sortBy].call(this);
    			item.sortBy = item.sortBy === "ascending" ?  "descending" : "ascending";
    		}
    		else {
    			item.isSorted = true;
    			item.sortBy = "ascending";
    			this.UIState.table.data = _.sortBy(data, prop);
    		}
    	}.bind(this));
    },

    initMergeArrays: function(data){
    	var clients = [];
    	data.forEach(function(item, i){
    		item.clients.data.sort();
    		clients = clients.concat(item.clients.data.filter(function (item) {
			    return clients.indexOf(item) < 0;
			}));
    	});

    	clients = clients.map(function(client, i){
    		return {
    			value: client,
    			isSelected: false
    		}
    	})

    	this.UIState.table.clients.data = clients;
    },

    initTableHeaders: function(data){
    	var headers = [];
    	var firstItem = data[0];
    	// fetching porperties names
    	for(var prop in firstItem){
    		headers.push({value: prop, lable: prop.replace(/_/g, " "), isSorted: false, sortBy: ""});
    	}
    	this.UIState.table.isRender = true;
    	this.UIState.table.headers = headers;
    },

	// ACTIONS

    onSortTable: function(prop){
    	this.initSortTable(this.UIState.table.data, prop);
    	this.trigger(this.UIState);
    },

	onToggleClientsGroup: function(id) {
		this.UIState.table.data.forEach(function(item, i){
			if(item.file_name === id) {
				item.clients.isActive = item.clients.isActive === true ? false: true;
			}
			else{
				item.clients.isActive = false;
			}
		});
		this.trigger(this.UIState);
	},

	onToggleClientFilter: function(value) {
		this.UIState.table.clients.data.forEach(function(client){
			if(client.value === value){
				client.isSelected = !client.isSelected;
			}
		});
		this.trigger(this.UIState);
	},
	toggleFilter: function() {
		this.UIState.table.clients.isRender = !this.UIState.table.clients.isRender;
		this.trigger(this.UIState);
	}
});

module.exports = SearchStore;
