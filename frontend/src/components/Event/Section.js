import React from "react";
import Tile from "grommet/components/Tile";
import Tab from "grommet/components/Tab";
import Tabs from "grommet/components/Tabs";
import Inspector from "react-inspector";
import Sections from "./Sections";


export default function EventSection({ event, field }) {
    const Section = Sections[field];
    let content = <Inspector data={event.get(field).toJS()} name={field}/>;
    let style = { margin: 5 }
    if (Section) {
        content =  (
            <Tabs justify="start" responsive={false}>
                <Tab title={field} >
                    <Section data={event.get(field)}/>
                </Tab>
                <Tab title="Raw">
                    <Inspector data={event.get(field).toJS()} name={field}/>
                </Tab>
            </Tabs>
        );
        style = {
            paddingTop: 0,
            margin: 5
        }
    }
    return (
        <Tile align="start" style={style} pad="small" colorIndex="light-2"
              separator="all">
            {content}
        </Tile>
    )
}