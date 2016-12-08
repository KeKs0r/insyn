import React from "react";
import Button from "grommet/components/Button";


export default function Event({ event }) {
    const path = `/process/order/event/${event.get('uuid')}`;
    return (
        <Button label={event.getIn(['action', 'type'])} path={path}/>
    );
}