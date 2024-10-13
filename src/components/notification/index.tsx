import { Notification } from "@/type/Notification"
import { CloseOutlined, LoadingOutlined, MailOutlined, ShoppingOutlined, WarningOutlined } from "@ant-design/icons";
import { Alert, Button, Card } from "antd"
import React from "react";
import { MainText, Tag, TitleContainer } from "./style";
import { updateNotificationStatus } from "@/redux/slices/message-slice";
import { useStoreDispatch, useStoreSelector } from "@/redux/store";

type NotificationProps = {
    notifications: Notification[];
}

type NotificationItemProps = {
    icon: React.ReactNode;
    title: string;
    type: "info" | "success" | "warning" | "error";
}

const notificationIcon = (type: string): NotificationItemProps => {
    switch (type) {
        case "order":
            return {
                icon: <ShoppingOutlined />,
                title: "Khách đặt món",
                type: "info"
            }
        case "message":
            return {
                icon: <MailOutlined />,
                title: "Tin nhắn mới",
                type: "success"
            }
        default:
            return {
                icon: <WarningOutlined />,
                title: "Cảnh báo",
                type: "warning"
            }
    }
}

const title = (text: string, isRead: boolean, loading: boolean) => {
    return (
        <TitleContainer>
            <MainText>{text}</MainText>
            <Tag style={{ backgroundColor: isRead ? "#C65BCF" : "#DC5F00" }}>
                {
                    loading ?
                        <LoadingOutlined />
                        :
                        isRead ? "đã xác nhận" : "chưa xác nhận"
                }
            </Tag>
        </TitleContainer>
    )
}

export const NotificationCard: React.FC<NotificationProps> = ({ notifications }) => {
    const dispatch = useStoreDispatch();
    const loadingMessageId = useStoreSelector(state => state.mainNotificationSlice.loadingMessageId);

    const handleClick = async (notification: Notification) => {
        dispatch(updateNotificationStatus(notification));
    }

    return (
        <>
            <Card
                style={{ maxHeight: "30vw", minWidth: "25vw", overflow: "auto", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                className='custom-alert-card'
            >
                {notifications.map(notification => (
                    <div key={notification?.messageId} style={{ paddingTop: "0.5rem" }}>
                        <Alert
                            onClick={() => handleClick(notification)}
                            message={title(notificationIcon(notification.messageType).title, notification.isRead, loadingMessageId === notification?.messageId)}
                            description={notification.content}
                            showIcon
                            type={notificationIcon(notification.messageType).type}
                            icon={notificationIcon(notification.messageType).icon}
                            onClose={() => console.log("asd")}
                            className={`custom-alert-notification`}
                            action={
                                <Button icon={<CloseOutlined style={{ color: "rgba(0, 0, 0, 0.4)" }} />} type="text" size="small" />
                            }
                        />
                    </div>
                ))}
            </Card>
        </>
    )
}