import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, SettingOutlined, ShopOutlined, SolutionOutlined } from '@ant-design/icons'
import Link from 'next/link'

const SubMenu = Menu.SubMenu

export default function MenuComponent() {

    return (
        <Menu
            style={{ textAlign: 'left' }}
            defaultSelectedKeys={['1']}
            mode="inline"
        >
            <Menu.Item key="1">
                <Link href="/management/dashboard">Trang quản trị</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link href="/management/store/general">QL chi nhánh</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link href="/management/employee/general">QL nhân viên</Link>
            </Menu.Item>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <SolutionOutlined />
                        <span>QL nhà hàng</span>
                    </span>
                }
            >
                <Menu.Item key="4">
                    <Link href="/management/reservation/general">QL đặt chỗ</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link href="/management/item/general">QL món ăn</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link href="/management/category/general">QL danh mục</Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link href="/management/menu/general">QL thực đơn</Link>
                </Menu.Item>
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
                <Menu.Item key="8">
                    <Link href="/management/order/general">Danh sách đơn hàng</Link>
                </Menu.Item>
                <Menu.Item key="9">Lịch sử thanh toán</Menu.Item>
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
                <Menu.Item key="10">Giao diện</Menu.Item>
                <Menu.Item key="11">Tiền tệ</Menu.Item>
                <Menu.Item key="12">Ngôn ngữ</Menu.Item>
                <Menu.Item key="13">Vị trí</Menu.Item>
                <Menu.Item key="14">
                    <Link href="/management/role/general">Vai trò</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
}
