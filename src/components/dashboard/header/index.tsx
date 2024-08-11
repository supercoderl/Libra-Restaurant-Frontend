import React from 'react'
import { Avatar, Button, Dropdown } from 'antd'
import { HeaderContainer, Name, UserContainer } from './style'
import { CreditCardOutlined, LogoutOutlined, MenuOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons'

const items = [
    {
        label: 'Thông tin',
        key: '1',
        icon: <ProfileOutlined />
    },
    {
        label: 'Thanh toán',
        key: '2',
        icon: <CreditCardOutlined />
    },
    {
        label: 'Đăng xuất',
        key: '3',
        icon: <LogoutOutlined />
    },
];

type DashboardHeaderProps = {
    isShowButton?: boolean;
    onMenuClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isShowButton, onMenuClick}) => {
    return (
        <HeaderContainer className="header">
            { isShowButton && <Button icon={<MenuOutlined />} onClick={onMenuClick}/>}
            <Dropdown menu={{ items }} placement="bottomCenter" overlayStyle={{ cursor: 'pointer' }}>
                <UserContainer>
                    <Avatar icon={<UserOutlined />} style={{ margin: 5 }} size='small' />
                    <Name>Administrator</Name>
                </UserContainer>
            </Dropdown>
        </HeaderContainer>
    )
}

export default DashboardHeader;