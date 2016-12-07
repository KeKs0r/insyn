import {connect} from "react-redux";
import {setCustomerClass} from "modules/demo.js";


/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
    setCustomerClass,
};

const mapStateToProps = (state) => {
    return {
        customerClass: state.demo.get('customerClass'),
    };
};


export default connect(mapStateToProps, mapDispatchToProps);
