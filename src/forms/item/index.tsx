import { Button, Form, Input, Upload, Image } from "antd"
import { Container, ImageContainer } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;
    onFinish: (values: any) => void;
    src?: string | null;
    loading: boolean;
};

export const ItemForm: React.FC<FormProps> = ({ onChange, fields, title, onFinish, src, loading }) => {
    const [form] = Form.useForm();

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

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
                        label="Tên món"
                        tooltip="This is a required field"
                        name="title"
                        rules={[{ required: true, message: "Tên món là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập tên món..." />
                    </Form.Item>
                    <Form.Item
                        label="Slug"
                        tooltip={{ title: 'Slug sẽ hiển thị trên đường dẫn thay cho id của sản phẩm' }}
                        name="slug"
                        rules={[{ required: true, message: "Slug là bắt buộc" }]}
                    >
                        <Input addonBefore="https://librarestaurant.vn/" placeholder="slug-example" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="summary">
                        <Input.TextArea rows={5} placeholder="Nhập mô tả..." />
                    </Form.Item>
                    <Form.Item
                        label="Mã sản phẩm"
                        tooltip="Mã sản phẩm bắt đầu bằng FD (thức ăn) hoặc DK (đồ uống)"
                        name="sku"
                        rules={[{ required: true, message: "Mã sản phẩm là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập mã..." />
                    </Form.Item>
                    <ImageContainer>
                        <Form.Item
                            label="Hình ảnh"
                            name="picture"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                listType="picture-card"
                                multiple={false}
                                className="customSizedUpload"
                            >
                                {src && src !== '' ? 'Đổi hình' : 'Thêm hình'}
                            </Upload>
                        </Form.Item>
                        {
                            src && src !== '' && <Image
                                width={200}
                                style={{ borderRadius: 5, border: 1, borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.1)', marginTop: 6, padding: 5 }}
                                src={src}
                            />
                        }
                    </ImageContainer>
                    <Form.Item
                        label="Đơn giá"
                        tooltip="Giá của một món ăn/đồ uống"
                        name="price"
                        rules={[{ required: true, message: "Giá là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập đơn giá" />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        tooltip="Số lượng tồn của sản phẩm"
                        name="quantity"
                        rules={[{ required: true, message: "Số lượng là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập số lượng" />
                    </Form.Item>
                    <Form.Item label="Công thức" name="recipe">
                        <Input.TextArea rows={5} placeholder="Nhập công thức" />
                    </Form.Item>
                    <Form.Item label="Hướng dẫn sử dụng" name="instruction">
                        <Input.TextArea rows={5} placeholder="Nhập hướng dẫn sử dụng" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
                    </Form.Item>
                </Form>
            </Container>
        </DashboardLayout>
    )
}