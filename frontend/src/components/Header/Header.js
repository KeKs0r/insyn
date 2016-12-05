import React from "react";
import {connect} from "react-redux";
import {playProcess} from "modules/demo";
import Header from "grommet/components/Header";
import Actions from "grommet/components/icons/base/Actions";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";


export const MyHeader = ({ playProcess }) => {
    return (
        <Header
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
            <Title>Insyn - Transparent Business Processes Demo</Title>
            <Menu icon={<Actions />}
                  dropAlign={{ "right": "right" }}>
                <Anchor className="active" onClick={() => playProcess()}>
                    Replay Actions
                </Anchor>
            </Menu>
        </Header>
    )
}

export default connect(
    state => ({}),
    { playProcess }
)(MyHeader);
