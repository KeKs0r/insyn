import React from "react";
import "./section.scss";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";


export default function Customer({ data }) {
    const tdStyle = {
        paddingTop: 0,
        paddingLeft: 0,
    };
    return (
        <Table>
            <tbody>
            <TableRow>
                <td style={tdStyle}>
                    Name
                </td>
                <td style={tdStyle}>
                    {data.get('name')}
                </td>
            </TableRow>
            <TableRow>
                <td style={tdStyle}>
                    Class
                </td>
                <td style={tdStyle}>
                    {data.get('classification')}
                </td>
            </TableRow>
            </tbody>
        </Table>
    )
}