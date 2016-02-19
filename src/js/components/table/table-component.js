var React       = require("react");
var ReactDOM    = require('react-dom');
var Reflux      = require("reflux");
var Actions     = require("../../actions/actions.js");
var TableStore = require("../../stores/table-store.js");
var AppConfig   = require("../../configurations/app-config.js");

var TableComp = React.createClass({

    mixins: [Reflux.listenTo(TableStore, "onChangeCallback", "initialCallback")],

    initialCallback: function(status){
        this.setState({
            data: status.table.data,
            isRender: status.table.isRender
        });
    },

    render: function() {
        if(this.state === null || this.state.isRender === false) return null;
        return (
            <div className="table">
                Ben Gedi
            </div>
        );
    }

});

module.exports = TableComp;
