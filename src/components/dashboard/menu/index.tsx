import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, SettingOutlined, ShopOutlined, SolutionOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const SubMenu = Menu.SubMenu

export default function MenuComponent() {
    const {t} = useTranslation();

    return (
        <Menu
            style={{ textAlign: 'left' }}
            defaultSelectedKeys={['1']}
            mode="inline"
        >
            <Menu.Item key="1">
                <Link href="/management/dashboard">{t("admin-management")}</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link href="/management/store/general">{t("store-management")}</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link href="/management/employee/general">{t("staff-management")}</Link>
            </Menu.Item>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <SolutionOutlined />
                        <span>{t("restaurant-management")}</span>
                    </span>
                }
            >
                <Menu.Item key="4">
                    <Link href="/management/reservation/general">{t("reservation-management")}</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link href="/management/item/general">{t("food-management")}</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link href="/management/category/general">{t("category-management")}</Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link href="/management/menu/general">{t("menu-management")}</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                title={
                    <span>
                        <AppstoreOutlined />
                        <span>{t("order-management")}</span>
                    </span>
                }
            >
                <Menu.Item key="8">
                    <Link href="/management/order/general">{t("order-list")}</Link>
                </Menu.Item>
                <Menu.Item key="9">
                    <Link href="/management/payment-history/general">{t("payment-history")}</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub4"
                title={
                    <span>
                        <SettingOutlined />
                        <span>{t("options")}</span>
                    </span>
                }
            >
                <Menu.Item key="10">{t("graphics")}</Menu.Item>
                <Menu.Item key="11">{t("currency")}</Menu.Item>
                <Menu.Item key="12">{t("gps")}</Menu.Item>
                <Menu.Item key="13">
                    <Link href="/management/role/general">{t("role")}</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
}
