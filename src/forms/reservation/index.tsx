import { Button, DatePicker, Form, Input, Select } from "antd"
import { Container } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { Store } from "@/type/Store";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;
    onFinish: () => void;
    loading: boolean;
    stores: Store[];
};

export const ReservationForm: React.FC<FormProps> = ({ onChange, fields, title, onFinish, loading, stores }) => {
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
                >
                    <Form.Item
                        label="Số bàn"
                        name="tableNumber"
                        rules={[{ required: true, message: "Số bàn là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập số bàn..." />
                    </Form.Item>
                    <Form.Item
                        label="Sức chứa"
                        name="capacity"
                        rules={[{ required: true, message: "Sức chứa là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập sức chứa..." />
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
                            options={stores.map((item) => ({ value: item.storeId, label: item.name }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        tooltip={{ title: 'Hiển thị đặt chỗ hoặc ẩn đi' }}
                        name="status"
                        rules={[{ required: true, message: "Trạng thái là bắt buộc" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn trang thái"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: 0,
                                    label: 'Hoạt động',
                                },
                                {
                                    value: 1,
                                    label: 'Tạm khóa',
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={5} placeholder="Nhập mô tả..." />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian đặt chỗ"
                        name="reservationTime"
                    >
                        <DatePicker placeholder="Chọn thời gian..." />
                    </Form.Item>
                    <Form.Item
                        label="Tên khách hàng"
                        name="customerName"
                    >
                        <Input placeholder="Nhập tên khách hàng..." />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại khách"
                        name="customerPhone"
                    >
                        <Input placeholder="Nhập số điện thoại khách..." />
                    </Form.Item>
                </Form>
            </Container>
        </DashboardLayout>
    )
}