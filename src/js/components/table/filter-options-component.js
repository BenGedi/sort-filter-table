var React             = require("react");
var ReactDOM          = require('react-dom');
var Reflux            = require("reflux");
var ClassNames        = require("classnames");
var TableStore        = require("../../stores/table-store.js");
var Actions           = require("../../actions/actions.js");
var AppConfig         = require("../../configurations/app-config.js");

var FilterOptionsComp = React.createClass({

    mixins: [Reflux.listenTo(TableStore, "onChangeCallback", "initialCallback")],

    initialCallback: function(status){
        this.setState({
            isRender: status.table.clients.isRender,
            clients: status.table.clients.data
        });
    },

    onChangeCallback: function(status){
        this.setState({
            isRender: status.table.clients.isRender,
            clients: status.table.clients.data
        });
    },

    toggleClientFilter: function(e) {
        Actions.toggleClientFilter(e.target.value);
    },

    createItems: function(items){
        return items.map(function(item, i){
            return (
                <li key={item.value} className="filter_options__list_item">
                    <input type="checkbox" value={item.value} id={"checkbox-"+item.value} onChange={this.toggleClientFilter} checked={item.isSelected}/>
                    <lable htmlFor={"checkbox-"+item.value}>{item.value}</lable>
                </li>
            );

        }.bind(this));
    },

    render: function() {
        if(this.state === null || this.state.isRender === false) return null;
        return (
            <div className="filter_options">
                <header className="filter_options__header">
                    <h3 className="filter_options__header_title">Clients</h3>
                </header>
                <ul className="filter_options__list">
                    {this.createItems.call(this, this.state.clients)}
                </ul>
                <footer className="filter_options__footer">
                    <button className="filter_options__footer__button clear">Clear</button>
                    <button className="filter_options__footer__button filter">Filter</button>
                </footer>
            </div>
        );
    }

});

module.exports = FilterOptionsComp;
