import { HeaderText, ToolbarContainer } from "@/containers/dashboard-container/style";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

type HeaderProps = {
    isShowText?: boolean;
    title: string;
    onSubmit?: () => void;
    loading?: boolean;
}

const HeaderTitle: React.FC<HeaderProps> = ({ isShowText, title, onSubmit, loading }) => {
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>{title}</HeaderText>
            <Space>
                <Button icon={<RollbackOutlined />} type="primary" danger href="general">{isShowText && 'Quay lại'}</Button>
                <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    onClick={onSubmit}
                    loading={loading}
                >
                    {isShowText && 'Lưu'}
                </Button>
            </Space>
        </ToolbarContainer>
    )
}

export default HeaderTitle