import React from "react";
import Article from "grommet/components/Article";
import Heading from "grommet/components/Heading";
import Step from "./Step";
import Tiles from "grommet/components/Tiles";


export default function Line({ document, steps }) {
    const stepOut = steps
        .map((step, status) => <Step events={step} status={status}/>)
        .valueSeq();
    return (
        <Article style={{marginBottom:20}}>
            <Heading uppercase tag="h4"
                     colorIndex="neutral-2">{document}</Heading>
            <Tiles fill seperator="top">
                {stepOut}
            </Tiles>
        </Article>
    )
}