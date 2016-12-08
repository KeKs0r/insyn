import React from "react";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Article from "grommet/components/Article";
import EventDetails from "components/Event/Details";

export const EventView = ({ event }) => {
    return (
        <Box pad="small">
            <Article style={{ marginBottom: 20 }}>
                <Heading uppercase tag="h4"
                         colorIndex="neutral-2">{event.getIn(['action', 'type'])}
                </Heading>
                <EventDetails event={event}/>
            </Article>
        </Box>
    )
};

EventView.propTypes = {
    event: React.PropTypes.object.isRequired,
}

export default EventView
