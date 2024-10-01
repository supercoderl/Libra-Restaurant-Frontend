import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Button, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Divider, Image, Input, Select, Table, TableColumnsType, Tag, Tooltip } from "antd";
import { ActionContainer, AlignContainer, HeaderText, TableContainer, ToolbarContainer } from "./style";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, ReloadOutlined, RollbackOutlined } from "@ant-design/icons";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { ListRep } from "@/type/objectTypes";
import { useState } from "react";
import { Reservation } from "@/type/Reservation";
import { Status } from "@/enums";
import { MobileTable } from "@/components/mobile/tables/mobile-table";
import { useRouter } from "next/navigation";

type HeaderProps = {
    isShowText?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isShowText }) => {
    const router = useRouter();
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>Quản lý đặt chỗ</HeaderText>
            <Button
                icon={<RollbackOutlined />}
                type="primary"
                danger
                onClick={() => router.back()}
            >
                {isShowText && 'Quay lại'}
            </Button>
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

                <Checkbox onChange={onChangeCheckbox}>Đặt chỗ đã xóa</Checkbox>

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

type ReservationProps = {
    result?: ListRep | null;
    loading: boolean;
    onReload?: () => void;
    onPaginationChange?: (page: number, pageSize: number) => void;
    onSearch?: (text: string) => void;
}

export const ReservationContainer: React.FC<ReservationProps> = ({ result, loading, onReload, onPaginationChange, onSearch }) => {
    const columns: TableColumnsType<Reservation> = [
        {
            title: 'Mã QR',
            dataIndex: 'qrCode',
            align: 'center',
            width: 80,
            render: (text: string) => <Image width={60} src={text} alt="qr" />
        },
        {
            title: 'Số bàn',
            dataIndex: 'tableNumber',
            render: (text: number) => <a>{text}</a>,
        },
        {
            title: 'Số chỗ ngồi',
            dataIndex: 'capacity',
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'storeName'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 100,
            align: 'center',
            render: (status: number) => <Tag color="#0958d9">{Status[status as keyof typeof Status]}</Tag>
        },
        {
            title: 'Chức năng',
            dataIndex: '',
            key: 'x',
            width: '10%',
            align: 'center',
            render: (row: Reservation) => (
                <ActionContainer>
                    <Tooltip title="Xem">
                        <Button
                            icon={<EyeOutlined />}
                            type="link"
                            danger
                            onClick={() => {
                                setIsOpen(true);
                                setItemSelected(row);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Button
                            icon={<EditOutlined />}
                            type="link"
                            danger
                            href={`edit?reservationId=${row.reservationId}`}
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

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Reservation[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: Reservation) => ({
            name: record.storeId,
        }),
    };

    const [isOpen, setIsOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState<Reservation | null>(null);
    const { width } = useWindowDimensions();

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
                            title={`Bàn số ${item.tableNumber}`}
                            subTitle={item.storeName}
                            description={String(Status[item.status as keyof typeof Status])}
                            image="https://cdn-icons-png.flaticon.com/512/11138/11138514.png"
                        />
                    ))
            }
            {/* <ItemDetail
                isOpen={isOpen}
                handleCancel={() => {
                    setIsOpen(false);
                    setItemSelected(null);
                }}
                item={itemSelected}
            /> */}
        </DashboardLayout>
    )
}

