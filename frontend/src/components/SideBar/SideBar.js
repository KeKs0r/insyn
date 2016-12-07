import React from "react";
import Sidebar from "grommet/components/Sidebar";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Immutable from "immutable";
import _CustomerForm from "components/Customer/CustomerForm";
import CustomerContainer from "containers/CustomerClassificationContainer";

const CustomerForm = CustomerContainer(_CustomerForm);

export default function SideBar({ processes }) {
    processes = processes || Immutable.fromJS([{ label: 'Order Process', path: 'order' }]);
    const menu = processes.map(p => <Anchor href={`process/${p.get('path')}`}
                                            key={p.get('path')}>{p.get('label')}</Anchor>);
    return (
        <Sidebar colorIndex="neutral-1" size="small">
            <Header pad="medium" justify="between">
                <Title>
                    Processes
                </Title>
            </Header>
            <Menu primary={true}>
                {menu}
            </Menu>
            <CustomerForm/>
        </Sidebar>
    );
}