import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined, ShopOutlined, SolutionOutlined } from '@ant-design/icons'

const SubMenu = Menu.SubMenu

export default function MenuComponent() {
    return (
        <Menu
            style={{ textAlign: 'left' }}
            defaultSelectedKeys={['1']}
            mode="inline"
        >
            <Menu.Item key="1">Trang quản trị</Menu.Item>
            <Menu.Item key="2">QL chi nhánh</Menu.Item>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <SolutionOutlined />
                        <span>QL nhà hàng</span>
                    </span>
                }
            >
                <Menu.Item key="3">QL đặt chỗ</Menu.Item>
                <Menu.Item key="4">QL thức ăn</Menu.Item>
                <Menu.Item key="5">QL danh mục</Menu.Item>
                <Menu.Item key="6">QL thực đơn</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                title={
                    <span>
                        <AppstoreOutlined />
                        <span>QL đơn hàng</span>
                    </span>
                }
            >
                <Menu.Item key="7">Danh sách đơn</Menu.Item>
                <Menu.Item key="8">Lịch sử thanh toán</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub4"
                title={
                    <span>
                        <SettingOutlined />
                        <span>Cài đặt</span>
                    </span>
                }
            >
                <Menu.Item key="9">Giao diện</Menu.Item>
                <Menu.Item key="10">Tiền tệ</Menu.Item>
                <Menu.Item key="11">Ngôn ngữ</Menu.Item>
                <Menu.Item key="12">Vị trí</Menu.Item>
            </SubMenu>
        </Menu>
    )
}
