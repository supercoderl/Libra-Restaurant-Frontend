import React from 'react'
import { Tooltip, Avatar, Menu, Dropdown } from 'antd'
import { HeaderContainer } from './style'
import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd';

const items = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];


export default function DashboardHeader() {
    return (
        <HeaderContainer className="header">
            <Tooltip title="使用文档">
                <a
                    target="_blank"
                    href="https://pro.ant.design/docs/getting-started"
                    rel="noopener noreferrer"
                    title="使用文档"
                >
                    <QuestionCircleOutlined />
                </a>
            </Tooltip>
            <Dropdown menu={{ items }} placement="bottomCenter">
                <div>
                    <Avatar icon={<UserOutlined />} style={{ margin: 5 }} size='small' />
                    王闪火
                </div>
            </Dropdown>
        </HeaderContainer>
    )
}
