import React from "react";
import Diagram from "components/Diagram";

export const ProcessView = ({events}) => (
    <div style={{ margin: '0 auto' }}>
        <Diagram events={events}/>
    </div>
);

ProcessView.propTypes = {
    events: React.PropTypes.object.isRequired,
    // startProcess: React.PropTypes.func.isRequired,
}

export default ProcessView;
