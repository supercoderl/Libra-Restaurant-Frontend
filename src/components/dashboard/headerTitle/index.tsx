import { HeaderText, ToolbarContainer } from "@/containers/dashboard-container/style";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { TFunction } from "i18next";

type HeaderProps = {
    isShowText?: boolean;
    title: string;
    onSubmit?: () => void;
    loading?: boolean;
    t: TFunction<"translation", undefined>
}

const HeaderTitle: React.FC<HeaderProps> = ({ isShowText, title, onSubmit, loading, t }) => {
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>{title}</HeaderText>
            <Space>
                <Button icon={<RollbackOutlined />} type="primary" danger href="general">{isShowText && t("back")}</Button>
                <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    onClick={onSubmit}
                    loading={loading}
                >
                    {isShowText && t("save")}
                </Button>
            </Space>
        </ToolbarContainer>
    )
}

export default HeaderTitle