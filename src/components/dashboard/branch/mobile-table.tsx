import { Avatar, Button, Divider } from "antd"
import { Card, CardAddress, CardContainer, CardText, CardTextContainer } from "./style"
import { EllipsisOutlined } from "@ant-design/icons"

type MobileTableProps = {
    data: any[];
}

export const MobileTable: React.FC<MobileTableProps> = ({ data }) => {
    return (
        <CardContainer>
            {
                data && data.length > 0 &&
                data.map((item, index) => (
                    (
                        <Card key={index}>
                            <Avatar size='small' src={<img src={'https://cdn-icons-png.flaticon.com/512/3232/3232841.png'} loading='lazy' alt="avatar" />} />
                            <CardTextContainer>
                                <CardText>{item.title}</CardText>
                                <CardAddress>{item.address}</CardAddress>
                            </CardTextContainer>
                            <Button icon={<EllipsisOutlined />} type="text" style={{ alignSelf: 'start' }} />
                        </Card>
                    )
                ))
            }
        </CardContainer>
    )
}