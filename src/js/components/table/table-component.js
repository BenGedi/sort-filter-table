var React       = require("react");
var ReactDOM    = require('react-dom');
var Reflux      = require("reflux");
var Actions     = require("../../actions/actions.js");
var TableStore = require("../../stores/table-store.js");
var AppConfig   = require("../../configurations/app-config.js");

var TableComp = React.createClass({

    mixins: [Reflux.listenTo(SearchStore, "onChangeCallback")],

    onChangeCallback: function(status){
        this.setState({

        });
    },

    render: function() {
        return (
            <div className="table">

            </div>
        );
    }

});

module.exports = TableComp;
