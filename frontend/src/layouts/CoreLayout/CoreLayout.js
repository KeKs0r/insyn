import React, {Component} from "react";
import "./CoreLayout.scss";
import "../../styles/core.scss";
import App from "grommet/components/App";
import Split from "grommet/components/Split";
import SideBar from "components/SideBar/SideBar";
import Header from "components/Header/Header.js";

export class CoreLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: true
        };
    }

    render() {
        const { showNav, children } = this.props;
        return (
            <App centered={false}>
                <Header />
                <Split separator={true} flex="right">
                    <SideBar />
                    <div className='core-layout__viewport'>
                        {children}
                    </div>
                </Split>
            </App>
        )
    }
}

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
}

export default CoreLayout
