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

export const CategoryForm: React.FC<FormProps> = (props: FormProps) => {
    const [form] = Form.useForm();

    const { width } = useWindowDimensions();

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

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
                    <Form.Item name="picture" noStyle />
                    <ImageContainer>
                        <Form.Item
                            label="Hình ảnh"
                            name="base64"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                listType="picture-card"
                                multiple={false}
                                className="customSizedUpload"
                            >
                                {props.src && props.src !== '' ? 'Đổi hình' : 'Thêm hình'}
                            </Upload>
                        </Form.Item>
                        {
                            props.src && props.src !== '' && <Image
                                width={200}
                                style={{ borderRadius: 5, border: 1, borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.1)', marginTop: 6, padding: 5 }}
                                src={props.src}
                            />
                        }
                    </ImageContainer>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={5} placeholder="Nhập mô tả..." />
                    </Form.Item>
                </Form>
            </Container>
        </DashboardLayout>
    )
}