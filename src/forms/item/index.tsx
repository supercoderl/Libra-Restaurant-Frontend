import { Form, Input, Upload, Image, Select } from "antd"
import { Container, ImageContainer } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { useStoreSelector } from "@/redux/store";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;
    onFinish: () => void;
    src?: string | null;
    loading: boolean;
};

export const ItemForm: React.FC<FormProps> = (props) => {
    const [form] = Form.useForm();
    const { width } = useWindowDimensions();

    const { categories } = useStoreSelector(state => state.mainCategorySlice);

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
                        label="Mã món ăn"
                        tooltip="Mã món ăn bắt đầu bằng FD (thức ăn) hoặc DK (đồ uống)"
                        name="sku"
                        rules={[{ required: true, message: "Mã món ăn là bắt buộc" }]}
                    >
                        <Input placeholder="Nhập mã..." />
                    </Form.Item>
                    <Form.Item
                        label="Danh mục"
                        name="categoryIds"
                    >
                        <Select
                            showSearch
                            mode="multiple"
                            placeholder="Chọn danh mục"
                            optionFilterProp="label"
                            options={categories.map((item) => ({ value: item.categoryId, label: item.name }))}
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
                </Form>
            </Container>
        </DashboardLayout >
    )
}