var React               = require('react');
var babelPolyfill       = require('babel-polyfill');
var TableComp			= require('./table/table-component.js');
var Actions             = require('../actions/actions.js');
var AppConfig           = require('../configurations/app-config.js');

var APP = React.createClass({

    render: function(){

        return (
            <main>
            	<TableComp/>
            </main>
        );
    }
});

module.exports = APP;
