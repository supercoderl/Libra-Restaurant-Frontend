import { Button, Col, Form, Input, Row, Select, Upload, UploadProps } from "antd"
import { Container } from "../style"
import { DashboardLayout } from "@/layouts/DashboardLayout";
import HeaderTitle from "@/components/dashboard/headerTitle";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useStoreDispatch, useStoreSelector } from "@/redux/store";
import { filterDistrictsAndWards, filterWards } from "@/redux/slices/locations-slice";


type FormProps = {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    title: string;
    onFinish: () => void;
    loading: boolean;
};

export const StoreForm: React.FC<FormProps> = ({ onChange, fields, title, onFinish, loading }) => {
    const [form] = Form.useForm();
    const { cities, districts, wards } = useStoreSelector(
        state => ({
            cities: state.mainLocationSlice.cities,
            districts: state.mainLocationSlice.districts,
            wards: state.mainLocationSlice.wards
        })
    );
    const dispatch = useStoreDispatch();

    const { width } = useWindowDimensions();

    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
        }
    };

    const handleChangeCity = (cityId: number) => {
        dispatch(filterDistrictsAndWards(cityId));
    }

    const handleChangeDistrict = (districtId: number) => {
        dispatch(filterWards(districtId));
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <DashboardLayout>
            <HeaderTitle
                title={title}
                isShowText={width > 767}
                onSubmit={onFinish}
                loading={loading}
            />
            <Container>
                <Form
                    form={form}
                    layout="vertical"
                    fields={fields}
                    onFieldsChange={(_, allFields) => {
                        onChange(allFields);
                    }}
                >
                    <Row gutter={[16, 0]} justify="center">
                        <Col span={6}>
                            <Form.Item
                                label="Tên chi nhánh"
                                name="name"
                                rules={[{ required: true, message: "Tên chi nhánh là bắt buộc" }]}
                            >
                                <Input placeholder="Nhập tên chi nhánh..." />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Thành phố"
                                name="cityId"
                                rules={[{ required: true, message: "Thành phố là bắt buộc" }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn thành phố"
                                    optionFilterProp="label"
                                    onChange={handleChangeCity}
                                    options={cities.map(city => ({ value: city.cityId, label: city.name }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Quận/huyện"
                                name="districtId"
                                rules={[{ required: true, message: "Quận/huyện là bắt buộc" }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn quận/huyện"
                                    optionFilterProp="label"
                                    onChange={handleChangeDistrict}
                                    options={districts.map(district => ({ value: district.districtId, label: district.name }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Phường/xã"
                                name="wardId"
                                rules={[{ required: true, message: "Phường/xã là bắt buộc" }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn phường/xã"
                                    optionFilterProp="label"
                                    options={wards.map(ward => ({ value: ward.wardId, label: ward.name }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Mã số thuế"
                                name="taxCode"
                            >
                                <Input placeholder="Nhập mã số thuế..." />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Mã bưu chính"
                                name="postalCode"
                            >
                                <Input placeholder="Nhập mã bưu chính..." />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                            >
                                <Input placeholder="Nhập số điện thoại..." />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Số fax"
                                name="fax"
                            >
                                <Input placeholder="Nhập số fax..." />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Row>

                                <Col span={12}>
                                    <Form.Item
                                        label="Logo"
                                        name="logo"
                                    >
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            onChange={handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={18}>
                            <Row gutter={[16, 0]}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Chi nhánh của ngân hàng"
                                        name="bankBranch"
                                    >
                                        <Input placeholder="Nhập chi nhánh của ngân hàng..." />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                    >
                                        <Input placeholder="Nhập email..." />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Trang web"
                                        name="website"
                                    >
                                        <Input placeholder="Nhập trang web..." />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Mã ngân hàng"
                                        name="bankCode"
                                    >
                                        <Input placeholder="Nhập mã ngân hàng..." />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Số tài khoản"
                                        name="bankAccount"
                                    >
                                        <Input placeholder="Nhập số tài khoản..." />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
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
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: "Địa chỉ là bắt buộc" }]}

                            >
                                <Input.TextArea rows={6} value="Nhập địa chỉ..." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Vị trí"
                                name="gpsLocation"
                            >
                                <Input.TextArea rows={6} value="Nhập vị trí..." />
                            </Form.Item>

                        </Col>
                    </Row>
                </Form>
            </Container>
        </DashboardLayout>
    )
}