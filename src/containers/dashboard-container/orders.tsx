import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Button, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Divider, Input, Modal, Select, Table, TableColumnsType, Tag, Tooltip } from "antd";
import { ActionContainer, AlignContainer, HeaderText, TableContainer, ToolbarContainer } from "./style";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileDoneOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { MobileTable } from "@/components/dashboard/branch/mobile-table";
import { ListRep } from "@/type/objectTypes";
import { useState } from "react";
import { Order } from "@/type/Order";
import { getOrderStatus } from "@/utils/status";
import { Invoice } from "@/components/invoice";

const Header = () => {
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>Quản lý đơn</HeaderText>
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

                <Checkbox onChange={onChangeCheckbox}>Đơn đã xóa</Checkbox>

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

type OrderProps = {
    result?: ListRep | null;
    loading: boolean;
    onReload?: () => void;
    onPaginationChange?: (page: number, pageSize: number) => void;
    onSearch?: (text: string) => void;
}

export const OrderContainer: React.FC<OrderProps> = ({ result, loading, onReload, onPaginationChange, onSearch }) => {
    const [showModal, setShowModal] = useState(false);

    const columns: TableColumnsType<Order> = [
        {
            title: 'Số hóa đơn',
            dataIndex: 'orderNo',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'storeName',
        },
        {
            title: 'Số bàn',
            dataIndex: 'reservationId',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'latestStatus',
            width: 100,
            align: 'center',
            render: (latestStatus: number) => <Tag color={getOrderStatus(latestStatus).color}>{getOrderStatus(latestStatus).title}</Tag>
        },
        {
            title: 'Chức năng',
            dataIndex: '',
            key: 'x',
            width: '10%',
            align: 'center',
            render: (row: Order) => (
                <ActionContainer>
                    <Tooltip title="Xem">
                        <Button
                            icon={<EyeOutlined />}
                            type="link"
                            danger
                            onClick={() => {
                                setIsOpen(true);
                                setShowModal(true);
                                setItemSelected(row);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="In hóa đơn">
                        <Button
                            icon={<FileDoneOutlined />}
                            type="link"
                            danger
                            href={`edit?menuId=${row.orderId}`}
                        />
                    </Tooltip>
                </ActionContainer>
            ),
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Order[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: Order) => ({

        }),
    };

    const [isOpen, setIsOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState<Order | null>(null);
    const { width } = useWindowDimensions();

    return (
        <DashboardLayout>
            <Header />
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
                    <MobileTable data={result ? result.items : []} />
            }
            {/* <ItemDetail
                isOpen={isOpen}
                handleCancel={() => {
                    setIsOpen(false);
                    setItemSelected(null);
                }}
                item={itemSelected}
            /> */}
            <Modal
                title="Hóa đơn"
                centered
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
                width={700}
            >
                <Invoice />
            </Modal>
        </DashboardLayout>
    )
}

