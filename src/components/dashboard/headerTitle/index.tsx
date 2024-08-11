import { HeaderText, ToolbarContainer } from "@/containers/dashboard-container/style";
import { RollbackOutlined } from "@ant-design/icons";
import { Button } from "antd";

type HeaderProps = {
    isShowText?: boolean;
    title: string
}

const HeaderTitle: React.FC<HeaderProps> = ({ isShowText, title }) => {
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>{title}</HeaderText>
            <Button icon={<RollbackOutlined />} type="primary" danger href="general">{isShowText && 'Quay lại'}</Button>
        </ToolbarContainer>
    )
}

export default HeaderTitle