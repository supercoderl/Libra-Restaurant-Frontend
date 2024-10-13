import React from 'react'
import { Avatar, Button, Dropdown, Flex } from 'antd'
import { Dot, HeaderContainer, Name, NotificationContainer, UserContainer } from './style'
import { BellOutlined, CreditCardOutlined, LogoutOutlined, MenuOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons'
import { TFunction } from 'i18next';
import { useStoreSelector } from '@/redux/store';
import { NotificationCard } from '@/components/notification';

type DashboardHeaderProps = {
    isShowButton?: boolean;
    onMenuClick?: () => void;
    t: TFunction<"translation", undefined>
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isShowButton, onMenuClick, t }) => {
    const { notifications, unread } = useStoreSelector(state => state.mainNotificationSlice);

    const items = [
        {
            label: t("information"),
            key: '1',
            icon: <ProfileOutlined />
        },
        {
            label: t("pay"),
            key: '2',
            icon: <CreditCardOutlined />
        },
        {
            label: t("logout"),
            key: '3',
            icon: <LogoutOutlined />
        },
    ];

    return (
        <HeaderContainer className="header">
            {isShowButton && <Button icon={<MenuOutlined />} onClick={onMenuClick} />}
            <Flex gap={10} align="center">
                <Dropdown
                    dropdownRender={() => (<NotificationCard notifications={notifications} />)}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <NotificationContainer>
                        <Button shape="circle" size="middle" type="text" icon={<BellOutlined style={{ fontSize: 15 }} />} />
                        {unread > 0 && <Dot />}
                    </NotificationContainer>
                </Dropdown>
                <Dropdown menu={{ items }} placement="bottomCenter" overlayStyle={{ cursor: 'pointer' }}>
                    <UserContainer>
                        <Avatar icon={<UserOutlined />} style={{ margin: 5 }} size='small' />
                        <Name>Administrator</Name>
                    </UserContainer>
                </Dropdown>
            </Flex>
        </HeaderContainer>
    )
}

export default DashboardHeader;