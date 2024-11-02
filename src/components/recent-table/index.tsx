import React from "react";
import { Dropdown, Menu, Table } from "antd";

import {
    EllipsisOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

function DropDownRowMenu() {
    const Show = () => { };
    function Edit() { }
    function Delete() { }
    return (
        <Menu style={{ width: 130 }}>
            <Menu.Item icon={<EyeOutlined />} onClick={Show}>
                Show
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} onClick={Edit}>
                Edit
            </Menu.Item>
            <Menu.Item icon={<DeleteOutlined />} onClick={Delete}>
                Delete
            </Menu.Item>
        </Menu>
    );
}

export default function RecentTable({ ...props }) {
    let { entity, dataTableColumns } = props;
    dataTableColumns = [
        ...dataTableColumns,
        {
            title: "",
            render: () => (
                <Dropdown trigger={["click"]}>
                    <EllipsisOutlined style={{ cursor: "pointer", fontSize: "24px" }} />
                </Dropdown>
            ),
        },
    ];

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    return (
        <>
            <Table
                columns={dataTableColumns}
                rowKey={(item) => item.key}
                dataSource={dataSource}
                pagination={false}
            />
        </>
    );
}