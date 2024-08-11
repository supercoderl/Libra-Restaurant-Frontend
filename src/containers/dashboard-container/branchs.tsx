import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Button, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Divider, Input, Select, Table, TableColumnsType, Tooltip } from "antd";
import { ActionContainer, AlignContainer, HeaderText, TableContainer, ToolbarContainer } from "./style";
import { DeleteOutlined, EditOutlined, EyeOutlined, ReloadOutlined, RollbackOutlined } from "@ant-design/icons";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { MobileTable } from "@/components/dashboard/branch/mobile-table";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        width: '10%',
        render: () => (
            <ActionContainer>
                <Tooltip title="Xem">
                    <Button
                        icon={<EyeOutlined />}
                        type="link"
                        danger
                    />
                </Tooltip>
                <Tooltip title="Sửa">
                    <Button
                        icon={<EditOutlined />}
                        type="link"
                        danger
                    />
                </Tooltip>
                <Tooltip title="Xóa">
                    <Button
                        icon={<DeleteOutlined />}
                        type="link"
                        danger
                    />
                </Tooltip>
            </ActionContainer>
        ),
    }
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
];

type HeaderProps = {
    isShowText?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isShowText }) => {
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>Quản lý chi nhánh</HeaderText>
            <Button icon={<RollbackOutlined />} type="primary" danger>{isShowText && 'Quay lại'}</Button>
        </ToolbarContainer>
    )
}

type ToolbarProps = {
    isRow?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ isRow }) => {
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const { Search } = Input;

    return (
        <ToolbarContainer isRow={isRow}>
            <AlignContainer>
                <DatePicker onChange={onChangeDate} />

                <Select
                    showSearch
                    placeholder="Select a person"
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

                <Select
                    showSearch
                    placeholder="Select a person"
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

                <Checkbox onChange={onChangeCheckbox}>Checkbox</Checkbox>

                <Button>Tìm kiếm</Button>

                <Button type="primary">Reset</Button>
            </AlignContainer>

            <Divider type="vertical" />

            <AlignContainer>
                <Button type="primary" icon={<ReloadOutlined />}>Tải lại</Button>

                <Search placeholder="Tìm kiếm..." onSearch={onSearch} />
            </AlignContainer>
        </ToolbarContainer>
    )
}

export const BranchContainer = () => {

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            name: record.name,
        }),
    };

    const items = [
        {
            title: "Chi nhánh Quận 1",
            address: "24/10 Nguyễn Thị Minh Khai, Q1, TPHCM"
        },
        {
            title: "Chi nhánh Quận 10",
            address: "918/981/12 đường 3 tháng 2, Q10, TPHCM"
        },
        {
            title: "Chi nhánh Quận 1",
            address: "24/10 Nguyễn Thị Minh Khai, Q1, TPHCM"
        },
        {
            title: "Chi nhánh Quận 10",
            address: "918/981/12 đường 3 tháng 2, Q10, TPHCM"
        }
    ]

    const { width } = useWindowDimensions();

    return (
        <DashboardLayout>
            <Header isShowText={width > 767} />
            <Toolbar isRow={width > 767} />
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
                            dataSource={data}
                            style={{ borderRadius: 0 }}
                        />
                    </TableContainer>
                    :
                    <MobileTable data={items} />
            }

        </DashboardLayout>
    )
}