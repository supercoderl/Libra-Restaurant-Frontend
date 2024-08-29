import { BillContainer, Card, Container, ContentContainer, Curved, Icon, IconContainer, ItemContainer, Logo, LogoImg, LogoRed, StatusText, TextFooter, TextItem, TextItemContainer, Title } from "./style";
import logo from "../../../public/assets/images/logo-no-bg.png";
import { Loading } from "@/components/loading";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentMethod, PaymentStatus } from "@/enums";
import { useRouter } from "next/router";
import { checkStripe, checkVNPay } from "@/utils/payment";
import { updatePayment } from "@/api/business/paymentHistoryApi";
import { toast } from "react-toastify";

export default function Cart() {
    const { width } = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    const onCheckStatus = async () => {
        let object = {};

        if (checkVNPay(searchParams.entries())) {
            object = {
                amount: searchParams.get("vnp_Amount"), //100.000 VND
                status: searchParams.get("vnp_TransactionStatus") == "00" ? PaymentStatus.Success : PaymentStatus.Fail, //00 - success;
                transactionId: searchParams.get("vnp_TxnRef"),
                responseJSON: router.asPath.split('?')[1],
                callbackURL: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
                orderId: searchParams.get("vnp_OrderInfo")?.split(':')[1],
                paymentMethodId: PaymentMethod.VNPay
            }
        }

        else if (checkStripe(searchParams.entries())) {
            object = {
                amount: Number(searchParams.get("stripe_amount")) / 100, //10 USD
                status: searchParams.get("stripe_status") == "00" ? PaymentStatus.Success : PaymentStatus.Fail, //00 - success;
                transactionId: searchParams.get("stripe_transaction"),
                responseJSON: router.asPath.split('?')[1],
                callbackURL: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
                orderId: searchParams.get("stripe_order"),
                paymentMethodId: PaymentMethod.Stripe
            }
        }

        try {
            await updatePayment(object);
        }
        catch (error) {
            console.log("Update payment: ", error);
            toast("Có lỗi xảy ra!", { type: "error" });
        }
        finally {
            setTimeout(() => setLoading(false), 600);
        }
    }

    useEffect(() => {
        onCheckStatus();
    }, []);

    return (
        <Container>
            {
                !loading ?
                    <Card>
                        <Curved />
                        <Logo>
                            Libra
                            <LogoRed> Restaurant</LogoRed>
                            <LogoImg src={logo.src} alt="" />
                        </Logo>
                        <IconContainer>
                            <Icon loading="lazy" src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" alt="" />
                        </IconContainer>

                        <ContentContainer>
                            <StatusText>Đã thanh toán</StatusText>

                            <BillContainer className="receipt">
                                <Title>Thanh toán hóa đơn tại nhà hàng Libra</Title>
                                <ItemContainer>
                                    <TextItemContainer>
                                        <TextItem>Merchant</TextItem>
                                        <TextItem>Libra Restaurant</TextItem>
                                    </TextItemContainer>
                                    <TextItemContainer>
                                        <TextItem>Payment ID</TextItem>
                                        <TextItem>123456789</TextItem>
                                    </TextItemContainer>
                                    <TextItemContainer>
                                        <TextItem>Order ID</TextItem>
                                        <TextItem>123456789</TextItem>
                                    </TextItemContainer>
                                    <TextItemContainer>
                                        <TextItem>Phương thức thanh toán</TextItem>
                                        <TextItem>VN Pay</TextItem>
                                    </TextItemContainer>
                                    <TextItemContainer>
                                        <TextItem>Thời gian</TextItem>
                                        <TextItem>10. 10. 2024 / 14:26:42</TextItem>
                                    </TextItemContainer>
                                    <TextItemContainer>
                                        <TextItem isBold>Tổng cộng</TextItem>
                                        <TextItem isBold>100,000 đ</TextItem>
                                    </TextItemContainer>
                                </ItemContainer>
                            </BillContainer>
                        </ContentContainer>
                        <TextFooter>Khoản thanh toán này được đảm bảo an toàn nhờ giải pháp G Pay</TextFooter>
                    </Card>
                    :
                    <Loading width={width > 767 ? "10%" : "40%"} />
            }
        </Container>
    )
}