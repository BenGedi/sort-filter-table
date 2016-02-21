var Reflux    = require("reflux");

var Actions = Reflux.createActions({
    "sortTable"                 : {},
    "toggleClientsGroup"        : {},
    "toggleFilter"              : {},
    "toggleClientFilter"        : {},
    "removeAllFilterCheckboxes" : {},
    "filterTable"               : {}
});

module.exports = Actions;
