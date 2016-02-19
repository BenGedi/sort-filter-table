var Moment = require('moment');

var names = "";

var UTILS = {
    setFormatDateTime: function(timeObj) {
        return Moment(timeObj).format("YYYY-MMM-DD h:mm:ss A").toUpperCase();
    },
    generateData: function() {
    	var data = [];
    	for (var i = 0; i < 30; i++){
    		var item = {

    		}
    	}
    },

    generateName: function(){

    }

};

module.exports = UTILS;
