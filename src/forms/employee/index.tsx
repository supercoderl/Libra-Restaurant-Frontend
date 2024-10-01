import { Form, Input, Select } from "antd"
import { Container } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { useStoreSelector } from "@/redux/store";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;                                                                                                                                           
    onFinish: () => void;
    loading: boolean;
};

export const EmployeeForm: React.FC<FormProps> = ({ onChange, fields, title, onFinish, loading }) => {
    const [form] = Form.useForm();
    const { stores } = useStoreSelector(state => state.mainStoreSlice);

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
                        label="Tên nhân viên"
                        name="firstName"
                        rules={[{ required: true, message: "Tên nhân viên là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tên nhân viên..." />
                    </Form.Item>
                    <Form.Item
                        label="Họ nhân viên"
                        name="lastName"
                        rules={[{ required: true, message: "Họ nhân viên là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập họ nhân viên..." />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Email là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập email..." />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="mobile"
                        rules={[{ required: true, message: "Số điện thoại là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập số điện thoại..." />
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
                </Form>
            </Container>
        </DashboardLayout>
    )
}