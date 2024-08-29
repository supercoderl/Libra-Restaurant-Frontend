import { Button, Form, Input, Select } from "antd"
import { Container } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;
    onFinish: () => void;
    loading: boolean;
};

export const CategoryForm: React.FC<FormProps> = ({ onChange, fields, title, onFinish, loading }) => {
    const [form] = Form.useForm();

    const { width } = useWindowDimensions();

    return (
        <DashboardLayout>
            <HeaderTitle title={title} isShowText={width > 767} onSubmit={onFinish} loading={loading} />
            <Container>
                <Form
                    form={form}
                    layout="vertical"
                    fields={fields}
                    onFieldsChange={(_, allFields) => {
                        onChange(allFields);
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name"
                        rules={[{ required: true, message: "Tên danh mục là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tên danh mục..." />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        tooltip={{ title: 'Hiển thị danh mục hoặc ẩn đi' }}
                        name="isActive"
                        rules={[{ required: true, message: "Trạng thái là bắt buộc" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn trang thái"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: true,
                                    label: 'Hoạt động',
                                },
                                {
                                    value: false,
                                    label: 'Tạm khóa',
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={5} placeholder="Nhập mô tả..." />
                    </Form.Item>
                </Form>
            </Container>
        </DashboardLayout>
    )
}