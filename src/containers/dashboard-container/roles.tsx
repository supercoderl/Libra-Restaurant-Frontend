import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Button, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Divider, Input, Modal, Select, Table, TableColumnsType, Tooltip, Tree, TreeDataNode, TreeProps, Typography } from "antd";
import { ActionContainer, AlignContainer, HeaderText, TableContainer, ToolbarContainer } from "./style";
import { ApartmentOutlined, DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined, RollbackOutlined } from "@ant-design/icons";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { ListRep } from "@/type/objectTypes";
import { Role } from "@/type/Role";
import { useState } from "react";
import { MobileTable } from "@/components/mobile/tables/mobile-table";
import { useRouter } from "next/navigation";

type HeaderProps = {
    isShowText?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isShowText }) => {
    const router = useRouter();
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>Quản lý đơn</HeaderText>
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

                <Checkbox onChange={onChangeCheckbox}>Vai trò đã xóa</Checkbox>

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

type RoleProps = {
    result?: ListRep | null;
    loading: boolean;
    onReload?: () => void;
    onPaginationChange?: (page: number, pageSize: number) => void;
    onSearch?: (text: string) => void;
}

export const RoleContainer: React.FC<RoleProps> = ({ result, loading, onReload, onPaginationChange, onSearch }) => {

    const columns: TableColumnsType<Role> = [
        {
            title: 'Mã vai trò',
            dataIndex: 'roleId',
        },
        {
            title: 'Tên vai trò',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Chức năng',
            dataIndex: '',
            key: 'x',
            width: '10%',
            align: 'center',
            render: (row: Role) => (
                <ActionContainer>
                    <Tooltip title="Quyền hạn">
                        <Button
                            icon={<ApartmentOutlined />}
                            type="link"
                            danger
                            onClick={() => setIsOpen(true)}
                        />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Button
                            icon={<EditOutlined />}
                            type="link"
                            danger
                            href={`edit?roleId=${row.roleId}`}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            icon={<DeleteOutlined />}
                            type="link"
                            danger
                            href={`delete?roleId=${row.roleId}`}
                        />
                    </Tooltip>
                </ActionContainer>
            ),
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Role[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: Role) => ({

        }),
    };

    const { width } = useWindowDimensions();
    const [isOpen, setIsOpen] = useState(false);
    const [roleSeleteced, setRoleSelected] = useState<Role | null>(null);
    const { Text } = Typography;

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue as React.Key[]);
    };

    const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const treeData: TreeDataNode[] = [
        {
            title: '0-0',
            key: '0-0',
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                        { title: '0-0-0-0', key: '0-0-0-0' },
                        { title: '0-0-0-1', key: '0-0-0-1' },
                        { title: '0-0-0-2', key: '0-0-0-2' },
                    ],
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                        { title: '0-0-1-0', key: '0-0-1-0' },
                        { title: '0-0-1-1', key: '0-0-1-1' },
                        { title: '0-0-1-2', key: '0-0-1-2' },
                    ],
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                },
            ],
        },
        {
            title: '0-1',
            key: '0-1',
            children: [
                { title: '0-1-0-0', key: '0-1-0-0' },
                { title: '0-1-0-1', key: '0-1-0-1' },
                { title: '0-1-0-2', key: '0-1-0-2' },
            ],
        },
        {
            title: '0-2',
            key: '0-2',
        },
    ];

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
                            title={item.name}
                            subTitle={`Mã vai trò: ${item.roleId}`}
                            description={item.description}
                            image="https://cdn-icons-png.flaticon.com/512/16784/16784025.png"
                        />
                    ))
            }

            <Modal title="Quyền hạn" open={isOpen} onOk={() => { }} onCancel={() => setIsOpen(false)}>
                <Text>Chọn quyền hạn cho vai trò {roleSeleteced?.name}.</Text>
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={treeData}
                    rootStyle={{ marginTop: 10 }}
                />
            </Modal>
        </DashboardLayout>
    )
}

