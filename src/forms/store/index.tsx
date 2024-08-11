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

export const StoreForm: React.FC<FormProps> = ({ onChange, fields, title, onFinish, loading }) => {
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
                        label="Tên chi nhánh"
                        name="name"
                        rules={[{ required: true, message: "Tên chi nhánh là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tên chi nhánh..." />
                    </Form.Item>
                    <Form.Item
                        label="Thành phố"
                        name="cityId"
                        rules={[{ required: true, message: "Thành phố là bắt buộc" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn thành phố"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: 1,
                                    label: 'Jack',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Quận/huyện"
                        name="districtId"
                        rules={[{ required: true, message: "Quận/huyện là bắt buộc" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn quận/huyện"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: 1,
                                    label: 'Jack',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Phường/xã"
                        name="wardId"
                        rules={[{ required: true, message: "Phường/xã là bắt buộc" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn phường/xã"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: 1,
                                    label: 'Jack',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mã số thuế"
                        name="taxCode"
                    >
                        <Input placeholder="Nhập mã số thuế..." />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: "Địa chỉ là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập địa chỉ..." />
                    </Form.Item>
                    <Form.Item
                        label="Vị trí"
                        name="gpsLocation"
                    >
                        <Input placeholder="Nhập vị trí..." />
                    </Form.Item>
                    <Form.Item
                        label="Mã bưu chính"
                        name="postalCode"
                    >
                        <Input placeholder="Nhập mã bưu chính..." />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                    >
                        <Input placeholder="Nhập số điện thoại..." />
                    </Form.Item>
                    <Form.Item
                        label="Số fax"
                        name="fax"
                    >
                        <Input placeholder="Nhập số fax..." />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input placeholder="Nhập email..." />
                    </Form.Item>
                    <Form.Item
                        label="Trang web"
                        name="website"
                    >
                        <Input placeholder="Nhập trang web..." />
                    </Form.Item>
                    <Form.Item
                        label="Logo"
                        name="logo"
                    >
                        <Input placeholder="Nhập logo..." />
                    </Form.Item>
                    <Form.Item
                        label="Chi nhánh của ngân hàng"
                        name="bankBranch"
                    >
                        <Input placeholder="Nhập chi nhánh của ngân hàng..." />
                    </Form.Item>
                    <Form.Item
                        label="Mã ngân hàng"
                        name="bankCode"
                    >
                        <Input placeholder="Nhập mã ngân hàng..." />
                    </Form.Item>
                    <Form.Item
                        label="Số tài khoản"
                        name="bankAccount"
                    >
                        <Input placeholder="Nhập số tài khoản..." />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        tooltip={{ title: 'Hiển thị chi nhánh hoặc ẩn đi' }}
                        name="isActive"
                        rules={[{ required: true, message: "Trạng thái là bắt buộc" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn trạng thái"
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
                    </Form.Item>
                </Form>
            </Container>
        </DashboardLayout>
    )
}