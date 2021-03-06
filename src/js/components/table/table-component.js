var React      = require("react");
var ReactDOM   = require('react-dom');
var Reflux     = require("reflux");
var ClassNames = require("classnames")
var Actions    = require("../../actions/actions.js");
var FilterComp = require("./filter-component.js");
var TableStore = require("../../stores/table-store.js");
var AppConfig  = require("../../configurations/app-config.js");

var TableComp = React.createClass({

    mixins: [Reflux.listenTo(TableStore, "onChangeCallback", "initialCallback")],

    initialCallback: function(status){
        this.setState({
            data: status.table.data,
            headers: status.table.headers,
            clients: status.table.clients,
            isRender: status.table.isRender
        });
    },

    onChangeCallback: function(status){
        this.setState({
            data: status.table.data,
            headers: status.table.headers,
            clients: status.table.clients,
            isRender: status.table.isRender
        });
    },

    sortTable: function(prop){
        // Actions sortTable
        Actions.sortTable(prop);
    },

    createHeaders: function(headers) {
        return headers.map(function(header){
            var sortType = header.isSorted === true ? header.sortBy : "";
            if(header.value === "clients") {
                return (
                    <th scope="col" className={"files_table__headers__header "+ header.value} ref="clientFilter" key={header.value}>{header.lable}
                        <FilterComp id="clientsFilter"/>
                    </th>
                );
            }
            return (
                <th scope="col" className={"files_table__headers__header " + sortType} onClick={this.sortTable.bind(this, header.value)} key={header.value}>{header.lable}</th>
            );
        }.bind(this));
    },

    showClients: function(id) {
        Actions.toggleClientsGroup(id);
    },

    createTableRows: function(data){
        return (data.map(function(item, i){

            function createClients(items){
                return items.map(function(item){
                    return (
                        <li key={item} className="clients_group__item">
                            {item}
                        </li>
                    );
                });
            }

            var cellGroupActiveClass = ClassNames("files_table__body__row_cell", "group",{active: item.clients.isActive});
            var cellGroupTitle = item.clients.isActive === true ? "close clients" : "open Clients";

            return (
                <tr className="files_table__body__row" key={item.file_name}>
                    <td className="files_table__body__row_cell">{item.file_name}</td>
                    <td className="files_table__body__row_cell">{item.file_size+"MB"}</td>
                    <td className="files_table__body__row_cell">{item.date.time}</td>
                    <td className={cellGroupActiveClass}  title={"Click to "+cellGroupTitle} onClick={this.showClients.bind(this, item.file_name)}>
                        {item.clients.data.length > 1 ? <span>Group of {item.clients.data.length} clients</span> : item.clients.data[0]}
                        <ul className="clients_group">
                            {createClients(item.clients.data)}
                        </ul>
                    </td>
                </tr>
            );
        }.bind(this)));
    },



    render: function() {
        console.log(this.state)
        if(this.state === null || this.state.isRender === false) return null;
        var headers = this.state.headers;
        return (
                <table className="files_table">
                    <thead className="files_table__headers">
                            <tr className="files_table__headers__row">
                                {this.createHeaders.call(this,headers)}
                            </tr>
                    </thead>
                    <tfoot>

                    </tfoot>
                    <tbody className="files_table__body">
                        {this.createTableRows.call(this, this.state.data)}
                    </tbody>
                </table>
        );
    }

});

module.exports = TableComp;
