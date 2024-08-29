import React, { useEffect } from "react";
import { Divider, Row, Col } from "antd";

import { Statistic, Progress, Tag } from "antd";

import { ArrowUpOutlined } from "@ant-design/icons";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import RecentTable from "@/components/recent-table";
import { Container, PreviewContainer, PreviewContentContainer, PreviewStateContainer, PreviewText, PreviewTextContainer, PreviewTextProgress, RecentContainer, RecentText, Space, Text, TextContainer } from "./style";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { items } from "@/api/business/itemApi";

type TopCardProps = {
    title: string;
    tagContent: string;
    tagColor: string;
    prefix: string;
    isFullWidth?: boolean;
}

const TopCard: React.FC<TopCardProps> = ({ title, tagContent, tagColor, prefix, isFullWidth }) => {

    return (
        <Col className="gutter-row" span={isFullWidth ? 24 : 6}>
            <Container>
                <TextContainer>
                    <Text>{title}</Text>
                </TextContainer>
                <Divider style={{ padding: 0, margin: 0 }}></Divider>
                <TextContainer>
                    <Row gutter={[0, 0]}>
                        <Col className="gutter-row" span={11} style={{ textAlign: "left" }}>
                            <div className="left">{prefix}</div>
                        </Col>
                        <Col className="gutter-row" span={2}>
                            <Divider
                                style={{ padding: "10px 0", justifyContent: "center" }}
                                type="vertical"
                            ></Divider>
                        </Col>
                        <Col
                            className="gutter-row"
                            span={11}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <Tag
                                color={tagColor}
                            >
                                {tagContent}
                            </Tag>
                        </Col>
                    </Row>
                </TextContainer>
            </Container>
        </Col>
    );
};

type PreviewStateProps = {
    tag: string;
    color: string;
    value: number;
}

const PreviewState: React.FC<PreviewStateProps> = ({ tag, color, value }) => {
    let colorCode = "#000";
    switch (color) {
        case "bleu":
            colorCode = "#1890ff";
            break;
        case "green":
            colorCode = "#95de64";
            break;
        case "red":
            colorCode = "#ff4d4f";
            break;
        case "orange":
            colorCode = "#ffa940";
            break;
        case "purple":
            colorCode = "#722ed1";
            break;
        case "grey":
            colorCode = "#595959";
            break;
        case "cyan":
            colorCode = "#13c2c2";
            break;
        case "brown":
            colorCode = "#614700";
            break;
        default:
            break;
    }
    return (
        <PreviewStateContainer>
            <PreviewContentContainer>
                <div className="left alignLeft">{tag}</div>
                <div className="right alignRight">{value} %</div>
            </PreviewContentContainer>
            <Progress
                percent={value}
                showInfo={false}
                strokeColor={{
                    "0%": colorCode,
                    "100%": colorCode,
                }}
            />
        </PreviewStateContainer>
    );
};
export default function DashboardContainer() {
    const { width } = useWindowDimensions();

    const leadColumns = [
        {
            title: "Client",
            dataIndex: "client",
        },
        {
            title: "phone",
            dataIndex: "phone",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => {
                let color = status === "pending" ? "volcano" : "green";

                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    const productColumns = [
        {
            title: "Product Name",
            dataIndex: "productName",
        },

        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => {
                let color = status === "available" ? "green" : "volcano";

                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    const getItems = async () => {
        const res = await items();
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <DashboardLayout>
            <Row gutter={[24, 24]} style={{ flexDirection: width > 767 ? 'row' : 'column' }}>
                <TopCard
                    title={"Nguyên liệu"}
                    tagColor={"cyan"}
                    prefix={"Tháng này"}
                    tagContent={"34,000,000 ₫"}
                    isFullWidth={width <= 767}
                />
                <TopCard
                    title={"Đơn hàng"}
                    tagColor={"purple"}
                    prefix={"Tháng này"}
                    tagContent={"780,000,000 ₫"}
                    isFullWidth={width <= 767}
                />
                <TopCard
                    title={"Nhân viên"}
                    tagColor={"green"}
                    prefix={"Tháng này"}
                    tagContent={"150,000,000 ₫"}
                    isFullWidth={width <= 767}
                />
                <TopCard
                    title={"Doanh thu"}
                    tagColor={"red"}
                    prefix={"Cả năm"}
                    tagContent={"1,720,490,000 ₫"}
                    isFullWidth={width <= 767}
                />
            </Row>
            <Space />
            <Row gutter={[24, 24]}>
                {
                    width > 767 &&
                    <Col className="gutter-row" span={18}>
                        <PreviewContainer>
                            <Row className="pad10" gutter={[0, 0]}>
                                <Col className="gutter-row" span={8}>
                                    <PreviewTextContainer>
                                        <PreviewText>Đánh giá từ trực tiếp</PreviewText>
                                        <PreviewState tag={"Draft"} color={"grey"} value={3} />
                                        <PreviewState tag={"Pending"} color={"bleu"} value={5} />
                                        <PreviewState tag={"Not Paid"} color={"orange"} value={12} />
                                        <PreviewState tag={"Overdue"} color={"red"} value={6} />
                                        <PreviewState
                                            tag={"Partially Paid"}
                                            color={"cyan"}
                                            value={8}
                                        />
                                        <PreviewState tag={"Paid"} color={"green"} value={55} />
                                    </PreviewTextContainer>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    {" "}
                                    <PreviewTextContainer>
                                        <PreviewText>Đánh giá trên google map</PreviewText>
                                        <PreviewState tag={"Draft"} color={"grey"} value={3} />
                                        <PreviewState tag={"Pending"} color={"bleu"} value={5} />
                                        <PreviewState tag={"Not Paid"} color={"orange"} value={12} />
                                        <PreviewState tag={"Overdue"} color={"red"} value={6} />
                                        <PreviewState
                                            tag={"Partially Paid"}
                                            color={"cyan"}
                                            value={8}
                                        />
                                        <PreviewState tag={"Paid"} color={"green"} value={55} />
                                    </PreviewTextContainer>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    {" "}
                                    <PreviewTextContainer>
                                        <PreviewText>Đánh giá từ đơn hàng</PreviewText>
                                        <PreviewState tag={"Draft"} color={"grey"} value={3} />
                                        <PreviewState tag={"Pending"} color={"bleu"} value={5} />
                                        <PreviewState tag={"Not Paid"} color={"orange"} value={12} />
                                        <PreviewState tag={"Overdue"} color={"red"} value={6} />
                                        <PreviewState
                                            tag={"Partially Paid"}
                                            color={"cyan"}
                                            value={8}
                                        />
                                        <PreviewState tag={"Paid"} color={"green"} value={55} />
                                    </PreviewTextContainer>
                                </Col>
                            </Row>
                        </PreviewContainer>
                    </Col>
                }

                <Col className="gutter-row" span={width > 767 ? 6 : 24}>
                    <PreviewContainer>
                        <TextContainer>
                            <PreviewTextProgress>Lợi nhuận từ khách hàng</PreviewTextProgress>

                            <Progress type="dashboard" percent={25} width={148} />
                            <p>Số lượng khách trong tháng</p>
                            <Divider />
                            <Statistic
                                title="Tăng"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: "#3f8600" }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </TextContainer>
                    </PreviewContainer>
                </Col>
            </Row>
            <Space />
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" span={width > 767 ? 12 : 24}>
                    <RecentContainer>
                        <PreviewTextContainer>
                            <RecentText>
                                Khách hàng gần đây
                            </RecentText>
                        </PreviewTextContainer>

                        <RecentTable entity={"lead"} dataTableColumns={leadColumns} />
                    </RecentContainer>
                </Col>

                <Col className="gutter-row" span={width > 767 ? 12 : 24}>
                    <RecentContainer>
                        <PreviewTextContainer>
                            <RecentText>
                                Sản phẩm gần đây
                            </RecentText>
                        </PreviewTextContainer>
                        <RecentTable entity={"product"} dataTableColumns={productColumns} />
                    </RecentContainer>
                </Col>
            </Row>
        </DashboardLayout>
    );
}