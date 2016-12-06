import React, {createFactory} from "react";
import Line from "./Line";
import {head} from "lodash";

const getDocStatus = (event) => {
    const resultStatus = event.getIn(['result', 'status']);
    const parts = resultStatus.split('.');
    if (parts.length < 2) {
        console.warn('Parts has not 2 :' + resultStatus);
    }
    return {
        document: parts[0],
        state: parts[1]
    }
}

const makeData = (events) => {
    // return events.toJS();
    const structured = events.groupBy((event) => {
        return getDocStatus(event).document;
    }).map((group) => {
        return group.groupBy((event) => {
            return getDocStatus(event).state;
        });
    });
    return structured;
}

/*
 const getMax = (events) => {
 return events
 .map(e => e.size)
 .reduce((max, key, value) => {
 return (max > value) ? max : value;
 }, 0);
 }

 */

export default function FlowDiagram({ events }) {
    const data = makeData(events);

    //const max = getMax(events);
    const output = data.map((steps, document) => {
        return <Line key={document} document={document} steps={steps}/>;
    }).valueSeq();
    return (
        <div style={{ paddingLeft: 30 }}>
            {output}
        </div>
    );
}



