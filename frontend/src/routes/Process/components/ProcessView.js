import React from "react";
import Diagram from 'components/Diagram';
import Split from "grommet/components/Split";
import Box from "grommet/components/Box";

export const ProcessView = ({ events, children }) => {
    const right = (children) ? (
        <Box
             justify="center"
             align="center"
             pad="medium"
        >
            {children}
        </Box>
    ) : null;
    return (
        <Split flex separator={Boolean(children)} fixed={false}>
            <Box style={{width: 750}}>
                <Diagram events={events}/>
            </Box>
            {right}
        </Split>
    );
};

ProcessView.propTypes = {
    events: React.PropTypes.object.isRequired,
    children: React.PropTypes.element,
    // startProcess: React.PropTypes.func.isRequired,
}

export default ProcessView;
