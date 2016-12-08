import React from "react";
import Box from 'grommet/components/Box';
import EventSection from './Section';
const sections = ['action', 'result', 'customerData', 'itemsData', 'sideactions'];
export default function EventDetails({ event }) {
    let elements = [];
    const addElement = (field) => {
        if(event.has(field)) {
            elements.push(<EventSection event={event} field={field} key={field} />);
        }
    }
    sections.forEach(addElement);
    return (
        <Box direction="column" flex>
            {elements}
        </Box>
    )
}