import React from "react";
import Event from "./Event";
import Tile from "grommet/components/Tile";
import Header from "grommet/components/Header";
import Heading from "grommet/components/Heading";


export default function Step({ events, status }) {
    const eventOut = events.map((e) => {
        return (<Event event={e} key={e.get('uuid')}/>);
    }).valueSeq();
    return (
        <Tile align="start" style={{ margin: 5, width: 60 }} pad="small" colorIndex="light-2"
              separator="all">
            <Header size="small"
                    pad={{ "horizontal": "small" }}>
                <Heading tag="h4"
                         strong={true}
                         margin="none">
                    {status}
                </Heading>
            </Header>
            {eventOut}
        </Tile>
    )
}