import { Button, Form, Input, Select } from "antd"
import { Container } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;
    onFinish: (values: any) => void;
    loading: boolean;
};

export const MenuForm: React.FC<FormProps> = ({ onChange, fields, title, onFinish, loading }) => {
    const [form] = Form.useForm();

    const { width } = useWindowDimensions();

    return (
        <DashboardLayout>
            <HeaderTitle title={title} isShowText={width > 767} />
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
                        label="Tên thực đơn"
                        name="name"
                        rules={[{ required: true, message: "Tên thực đơn là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tên thực đơn..." />
                    </Form.Item>
                    <Form.Item
                        label="Chi nhánh"
                        tooltip={{ title: 'Chọn chi nhánh có sẵn trên địa bàn' }}
                        name="storeId"
                        rules={[{ required: true, message: "Chi nhánh là bắt buộc" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn chi nhánh"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        tooltip={{ title: 'Hiển thị menu hoặc ẩn đi' }}
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
                    </Form.Item>
                </Form>
            </Container>
        </DashboardLayout>
    )
}