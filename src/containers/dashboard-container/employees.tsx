import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Button, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Divider, Input, Modal, Select, SelectProps, Table, TableColumnsType, Tag, Tooltip, Typography } from "antd";
import { ActionContainer, AlignContainer, HeaderText, TableContainer, ToolbarContainer } from "./style";
import { EditOutlined, LockOutlined, PlusOutlined, ReloadOutlined, SisternodeOutlined } from "@ant-design/icons";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { ListRep } from "@/type/objectTypes";
import { useState } from "react";
import { Employee } from "@/type/Employee";
import { UserStatus } from "@/enums";
import { useStoreSelector } from "@/redux/store";
import { assign } from "@/api/business/roleApi";
import { toast } from "react-toastify";
import { MobileTable } from "@/components/mobile/tables/mobile-table";

type HeaderProps = {
    isShowText?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isShowText }) => {
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>Quản lý nhân viên</HeaderText>
        </ToolbarContainer>
    )
}

type ToolbarProps = {
    isRow?: boolean;
    onReload?: () => void;
    onSearch?: (text: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isRow, onReload, onSearch }) => {
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const { Search } = Input;

    return (
        <ToolbarContainer isRow={isRow}>
            <AlignContainer>
                <DatePicker placeholder="Cập nhật lúc" onChange={onChangeDate} />

                <Select
                    showSearch
                    placeholder="Lọc theo"
                    optionFilterProp="label"
                    onChange={onChangeSelect}
                    onSearch={onSearch}
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

                <Checkbox onChange={onChangeCheckbox}>Nhân viên đã xóa</Checkbox>

                <Button>Lọc</Button>

                <Button type="primary">Reset</Button>

                <Button type="primary" danger icon={<PlusOutlined />} href="create">Thêm</Button>
            </AlignContainer>

            <Divider type="vertical" />

            <AlignContainer>
                <Button type="primary" icon={<ReloadOutlined />} onClick={onReload}>Tải lại</Button>

                <Search placeholder="Tìm kiếm..." onSearch={onSearch} />
            </AlignContainer>
        </ToolbarContainer>
    )
}

type EmployeeProps = {
    result?: ListRep | null;
    loading: boolean;
    onReload?: () => void;
    onPaginationChange?: (page: number, pageSize: number) => void;
    onSearch?: (text: string) => void;
}

export const EmployeeContainer: React.FC<EmployeeProps> = ({ result, loading, onReload, onPaginationChange, onSearch }) => {
    const columns: TableColumnsType<Employee> = [
        {
            title: 'Tên nhân viên',
            dataIndex: 'fullName',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'storeName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'mobile',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 100,
            align: 'center',
            render: (status: number) => status === UserStatus.Active ? <Tag color="success">Đang hoạt động</Tag> : <Tag color="error">Tạm khóa</Tag>
        },
        {
            title: 'Chức năng',
            dataIndex: '',
            key: 'x',
            width: '10%',
            align: 'center',
            render: (row: Employee) => (
                <ActionContainer>
                    <Tooltip title="Phân quyền">
                        <Button
                            icon={<SisternodeOutlined />}
                            type="link"
                            danger
                            onClick={() => {
                                setIsOpen(true);
                                setEmployeeSeleted(row);
                                setRolesSelected(row.roleIds || [])
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Button
                            icon={<EditOutlined />}
                            type="link"
                            danger
                            href={`edit?employeeId=${row.id}`}
                        />
                    </Tooltip>
                    <Tooltip title="Khóa">
                        <Button
                            icon={<LockOutlined />}
                            type="link"
                            danger
                        />
                    </Tooltip>
                </ActionContainer>
            ),
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Employee[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: Employee) => ({
            name: record.firstName,
        }),
    };

    const handleChange = (value: number[]) => {
        setRolesSelected(value);
    };

    const handleSubmit = async () => {
        if (!employeeSeleted) {
            toast("Chưa có nhân viên nào được chọn để phân quyền!", { type: "warning" });
            return;
        }
        if (rolesSelected.length <= 0) {
            toast("Chưa chọn quyền!", { type: "warning" });
            return;
        }

        const body = {
            employeeId: employeeSeleted?.id,
            roleIds: rolesSelected
        };

        try {
            const res = await assign(body);

            if (res && res.success) {
                toast("Phân quyền thành công", {
                    type: "success"
                });
            }
            else {
                toast("Phân quyền thất bại", {
                    type: "error"
                });
            }
        }
        catch (error) {
            toast("Lỗi xảy ra", {
                type: "error"
            });
            console.log(error);
        }
        finally {
            setEmployeeSeleted(null);
            setRolesSelected([]);
            setIsOpen(false);
            onReload && onReload();
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [rolesSelected, setRolesSelected] = useState<number[]>([]);
    const [employeeSeleted, setEmployeeSeleted] = useState<Employee | null>(null);
    const { width } = useWindowDimensions();
    const { Text } = Typography;
    const { roles } = useStoreSelector(state => state.mainRoleSlice);

    return (
        <DashboardLayout>
            <Header isShowText={width > 767} />
            <Toolbar isRow={width > 767} onReload={onReload} onSearch={onSearch} />
            {
                width > 767 ?
                    <TableContainer>
                        <Table
                            bordered
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={result?.items}
                            style={{ borderRadius: 0 }}
                            loading={loading}
                            pagination={{ pageSize: result?.pageSize, total: result?.count, onChange: onPaginationChange }}
                        />
                    </TableContainer>
                    :
                    result && result.items &&
                    result.items.map((item, index) => (
                        <MobileTable
                            key={index}
                            title={item.fullName}
                            subTitle={item.email}
                            description={item.status === 0 ? "Đang hoạt động" : "Bị khóa"}
                            image="https://cdn-icons-png.flaticon.com/512/11264/11264000.png"
                        />
                    ))
            }
            <Modal title="Phân quyền" open={isOpen} onOk={handleSubmit} onCancel={() => setIsOpen(false)}>
                <Text>Chọn quyền cho nhân viên {employeeSeleted?.fullName}. Bạn có thể gán lên tới 3 quyền cho một nhân viên.</Text>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%', marginTop: 10 }}
                    placeholder="Chọn quyền..."
                    onChange={handleChange}
                    value={rolesSelected}
                    options={roles.map(role => ({ value: role.roleId, label: role.name }))}
                />
            </Modal>
        </DashboardLayout>
    )
}
