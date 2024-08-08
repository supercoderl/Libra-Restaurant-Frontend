import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons'

const SubMenu = Menu.SubMenu

export default function MenuComponent() {
    return (
        <Menu
            style={{ textAlign: 'left' }}
            defaultSelectedKeys={['sub1']}
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            mode="inline"
        >
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <ShopOutlined />
                        <span>店铺管理</span>
                    </span>
                }
            >
                <Menu.Item key="1">店铺信息</Menu.Item>
                <Menu.Item key="2">公告管理</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <MailOutlined />
                        <span>商品管理</span>
                    </span>
                }
            >
                <Menu.Item key="3">分类管理</Menu.Item>
                <Menu.Item key="4">商品管理</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                title={
                    <span>
                        <AppstoreOutlined />
                        <span>订单管理</span>
                    </span>
                }
            >
                <Menu.Item key="5">订单列表</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub4"
                title={
                    <span>
                        <SettingOutlined />
                        <span>供应链管理</span>
                    </span>
                }
            >
                <Menu.Item key="5">骑手管理</Menu.Item>
            </SubMenu>
        </Menu>
    )
}
