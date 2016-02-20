var React             = require("react");
var ReactDOM          = require('react-dom');
var Reflux            = require("reflux");
var ClassNames        = require("classnames")
var Actions           = require("../../actions/actions.js");
var FilterStore       = require("../../stores/filter-store.js");
var FilterOptionsComp = require("./filter-options-component.js");
var AppConfig         = require("../../configurations/app-config.js");

var FilterComp = React.createClass({

    mixins: [Reflux.listenTo(FilterStore, "onChangeCallback", "initialCallback")],

    initialCallback: function(status){
        this.setState({
            isActive: status.filter.isActive
        });
    },

    onChangeCallback: function(status){
        this.setState({
            isActive: status.filter.isActive
        });
    },

    clickComponent: function(e) {
        if (this.refs[this.props.id].contains(e.target)) return;
        this.clickOutsideComponent(e);
    },

    clickOutsideComponent: function(e) {
        console.log("click outside Information Ips component");
        this.unmountSubComponent();
    },

    renderSubComponent: function (e) {
        if(this.state.isActive === true) return;
        document.addEventListener("click", this.clickComponent, false);
        // ReactDOM.render(<FilterOptionsComp/>, this.refs[this.props.id]);
        Actions.toggleFilter();
    },

    unmountSubComponent: function (){
        if(this.state.isActive === true) {
            // ReactDOM.unmountComponentAtNode(this.refs[this.props.id]);
            document.removeEventListener("click", this.clickComponent, false);
            Actions.toggleFilter();
        }
    },


    render: function() {

        if(this.state === null) return null;

        var fliterClass = ClassNames("filter_"+this.props.id, {active: this.state.isActive});
        var filterClassName = ClassNames("filter_button",{active: this.state.isActive});

        return (
                <div className={fliterClass}>
                    <button className={filterClassName} onClick={this.renderSubComponent} >
                        <i className="fa fa-filter"></i>
                    </button>
                    <FilterOptionsComp/>
                </div>
        );
    }

});

module.exports = FilterComp;
