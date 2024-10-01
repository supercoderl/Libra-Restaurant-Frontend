import { Image, Form, Input, Select, Upload } from "antd"
import { Container, ImageContainer } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;
    src?: string | null;
    onFinish: () => void;
    loading: boolean;
};

export const RoleForm: React.FC<FormProps> = (props: FormProps) => {
    const [form] = Form.useForm();

    const { width } = useWindowDimensions();

    return (
        <DashboardLayout>
            <HeaderTitle title={props.title} isShowText={width > 767} onSubmit={props.onFinish} loading={props.loading} />
            <Container>
                <Form
                    form={form}
                    layout="vertical"
                    fields={props.fields}
                    onFieldsChange={(_, allFields) => {
                        props.onChange(allFields);
                    }}
                    onFinish={props.onFinish}
                >
                    <Form.Item
                        label="Mã vai trò"
                        name="roleId"
                        rules={[{ required: true, message: "Mã vai trò là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập mã vai trò..." />
                    </Form.Item>
                    <Form.Item
                        label="Tên vai trò"
                        name="name"
                        rules={[{ required: true, message: "Tên vai trò là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tên vai trò..." />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={5} placeholder="Nhập mô tả..." />
                    </Form.Item>
                </Form>
            </Container>
        </DashboardLayout>
    )
}