import {connect} from "react-redux";
import _ from "lodash";

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
};

const mapStateToProps = (state, props) => {
    const uuid = _.get(props, 'uuid') || _.get(props, 'params.uuid');
    return {
        event: state.process.get('events').filter(e => e.get('uuid') === uuid).first(),
    };
};


export default connect(mapStateToProps, mapDispatchToProps);
