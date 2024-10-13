import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Button, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Divider, Image, Input, Modal, Select, Table, TableColumnsType, Tooltip } from "antd";
import { ActionContainer, AlignContainer, HeaderText, TableContainer, ToolbarContainer } from "./style";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, ReloadOutlined, RollbackOutlined } from "@ant-design/icons";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import Item from "@/type/Item";
import { ListRep } from "@/type/objectTypes";
import { formatCurrency } from "@/utils/currency";
import { useState } from "react";
import ItemDetail from "./item/item-detail";
import { useRouter } from "next/navigation";
import { MobileTable } from "@/components/mobile/tables/mobile-table";
import { TFunction } from "i18next";

type HeaderProps = {
    isShowText?: boolean;
    t: TFunction<"translation", undefined>
}

const Header: React.FC<HeaderProps> = ({ isShowText, t }) => {
    const router = useRouter();
    return (
        <ToolbarContainer isRow={true}>
            <HeaderText>{t("food-management-full")}</HeaderText>
            <Button
                icon={<RollbackOutlined />}
                type="primary"
                danger
                onClick={() => router.back()}
            >
                {isShowText && t("back")}
            </Button>
        </ToolbarContainer>
    )
}

type ToolbarProps = {
    isRow?: boolean;
    onReload?: () => void;
    onSearch?: (text: string) => void;
    t: TFunction<"translation", undefined>
}

const Toolbar: React.FC<ToolbarProps> = ({ isRow, onReload, onSearch, t }) => {
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
                <DatePicker placeholder={t("update-at")} onChange={onChangeDate} />

                <Select
                    showSearch
                    placeholder={t("filter-by")}
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

                <Checkbox onChange={onChangeCheckbox}>{t("food-deleted")}</Checkbox>

                <Button>{t("filter")}</Button>

                <Button type="primary">{t("reset")}</Button>

                <Button type="primary" danger icon={<PlusOutlined />} href="create">{t("create")}</Button>
            </AlignContainer>

            <Divider type="vertical" />

            <AlignContainer>
                <Button type="primary" icon={<ReloadOutlined />} onClick={onReload}>{t("reload")}</Button>

                <Search placeholder={t("search")} onSearch={onSearch} />
            </AlignContainer>
        </ToolbarContainer>
    )
}

type ItemProps = {
    result?: ListRep | null;
    loading: boolean;
    onReload?: () => void;
    onPaginationChange?: (page: number, pageSize: number) => void;
    onSearch?: (text: string) => void;
    t: TFunction<"translation", undefined>
}

export const ItemContainer: React.FC<ItemProps> = ({ result, loading, onReload, onPaginationChange, onSearch, t }) => {
    const columns: TableColumnsType<Item> = [
        {
            title: t("picture"),
            dataIndex: 'picture',
            align: 'center',
            render: (url?: string | null) => <Image width={80} src={url || process.env.NEXT_PUBLIC_DUMMY_PICTURE} />
        },
        {
            title: t("food-name"),
            dataIndex: 'title',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: t("slug"),
            dataIndex: 'slug',
        },
        {
            title: t("sku"),
            dataIndex: 'sku',
        },
        {
            title: t("price"),
            dataIndex: 'price',
            render: (text: string) => <span>{formatCurrency(Number(text))}</span>,
        },
        {
            title: t("quantity"),
            dataIndex: 'quantity',
            render: (text: string) => <span>{text} món</span>,
        },
        {
            title: t("actions"),
            dataIndex: '',
            key: 'x',
            width: '10%',
            align: 'center',
            render: (row: Item) => (
                <ActionContainer>
                    <Tooltip title={t("see")}>
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
                    <Tooltip title={t("edit")}>
                        <Button
                            icon={<EditOutlined />}
                            type="link"
                            danger
                            href={`edit?itemId=${row.itemId}`}
                        />
                    </Tooltip>
                    <Tooltip title={t("delete")}>
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
        onChange: (selectedRowKeys: React.Key[], selectedRows: Item[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: Item) => ({
            name: record.title,
        }),
    };

    const [isOpen, setIsOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState<Item | null>(null);
    const { width } = useWindowDimensions();

    return (
        <DashboardLayout t={t}>
            <Header t={t} isShowText={width > 767} />
            <Toolbar t={t} isRow={width > 767} onReload={onReload} onSearch={onSearch} />
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
                            title={item.title}
                            subTitle={`Slug: ${item.slug}`}
                            description={item.summary}
                            image="https://cdn-icons-png.flaticon.com/512/1586/1586087.png"
                        />
                    ))
            }
            <ItemDetail
                isOpen={isOpen}
                handleCancel={() => {
                    setIsOpen(false);
                    setItemSelected(null);
                }}
                t={t}
                item={itemSelected}
            />
        </DashboardLayout>
    )
}

