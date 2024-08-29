import { ModalSection } from "@/components/modal"
import React, { useState } from "react";
import { ContinueContainer, PaymentCard, PaymentCardButton, PaymentCardButtonContainer, PaymentCardContainer, PaymentCardFix, PaymentCardImage, PaymentCardTitle, PaymentCardType, PaymentCardTypeText, PaymentCartNotifyImg } from "./style";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import go from "../../../public/assets/animation/go.json";
import { Loading } from "@/components/loading";
import Lottie from "lottie-react";
import { pay } from "@/api/business/paymentApi";
import { convertVNDToUSD } from "@/utils/currency";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { useStoreSelector } from "@/redux/store";
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';

type PaymentProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    router: AppRouterInstance;
    orderId: string;
    amount: number;
}

export const Payment: React.FC<PaymentProps> = ({ show, setShow, router, orderId, amount }) => {
    const [selected, setSelected] = useState(0);
    const [type, setType] = useState("payment");
    const { width } = useWindowDimensions();
    const { paymentMethods } = useStoreSelector(
        state => ({
            paymentMethods: state.mainPaymentMethodSlice.paymentMethods
        }),
    );

    const onSubmit = () => {
        const payment = paymentMethods.find(x => x.paymentMethodId === selected);
        if (selected === 0) {
            toast("Vui lòng chọn một phương thức thanh toán!", { type: "warning" });
            return;
        }
        else if (payment && payment.name != "Trực tiếp tại quầy") {
            setType("loading");
            setTimeout(async () => {
                await onPost(payment.name, payment.paymentMethodId);
            }, 600);
        }
        else {
            setType("notify");
        }
    }

    const onPost = async (type: string, paymentMethodId: number) => {
        var body = {};
        switch (type) {
            case "Paypal":
                body = {
                    reference: uuid(), //Đổi order id,
                    currency: "USD",
                    value: convertVNDToUSD(amount),
                    paymentMethodId,
                    orderId
                };
                break;
            case "VNPay":
                body = {
                    isQR: false,
                    isVNBank: true,
                    isIntCard: false,
                    amount,
                    orderId, //Transaction id,
                    transactionId: uuid(),
                    status: "0",
                    paymentMethodId,
                    locale: "vn"
                }
                break;
            case "Stripe":
                body = {
                    amount: convertVNDToUSD(amount),
                    currency: "USD",
                    name: "Thanh toan hoa don",
                    description: "text",
                    quantity: 1,
                    mode: "payment",
                    customerEmail: "mzi23844@tccho.com",
                    paymentMethodId,
                    transactionId: uuid(),
                    orderId
                }
                break;
            case "PayOS":
                body = {
                    productName: "Ten san pham",
                    description: "Mo ta",
                    price: amount,
                    orderId,
                    paymentMethodId,
                    transactionId: uuid(),
                }
                break;
        };
        try {
            console.log(body);
            const res = await pay(body, type);
            if (res?.success && res.data) {
                switch (type) {
                    case "Paypal":
                        window.open(res.data.links[1].href, "_blank");
                        break;
                    case "VNPay":
                        window.open(res.data, "_blank");
                        break;
                    case "PayOS":
                        window.open(res.data.checkoutUrl, "_blank");
                        break;
                    case "Stripe":
                        window.open(res.data.url, "_blank");
                        break;
                }
            }
        }
        catch (error) {
            console.log("Pay: ", error)
        }
        finally {
            setShow(false);
            setType("payment");
        }
    }

    const render = (type: string) => {
        switch (type) {
            case "payment":
                return (
                    <>
                        <PaymentCardTitle>
                            <h2>Thanh toán</h2>
                        </PaymentCardTitle>
                        <div>
                            <div>
                                <h4>Chọn một phương thức dưới đây để thanh toán</h4>
                                <PaymentCardContainer>
                                    {
                                        paymentMethods.map((item) => (
                                            <PaymentCardType
                                                key={item.paymentMethodId}
                                                className={`group type ${selected === item.paymentMethodId && 'selected'}`}
                                                isSelected={selected === item.paymentMethodId}
                                                onClick={() => setSelected(item.paymentMethodId)}
                                            >
                                                <PaymentCardImage src={item.picture || ''} alt={item.name} />
                                                <PaymentCardTypeText>
                                                    <p>{item.name}</p>
                                                </PaymentCardTypeText>
                                            </PaymentCardType>
                                        ))
                                    }
                                </PaymentCardContainer>
                            </div>
                        </div>
                        <PaymentCardButtonContainer>
                            <div>
                                <PaymentCardButton
                                    isSecondary={true}
                                    onClick={() => router.push("/")}
                                >
                                    Trở về trang chủ
                                </PaymentCardButton>
                            </div>
                            <ContinueContainer>
                                <PaymentCardButton isLink={true} onClick={() => setShow(false)}>Quay lại</PaymentCardButton>
                                <PaymentCardButton
                                    isPrimary={true}
                                    onClick={onSubmit}
                                >
                                    Tiếp theo
                                </PaymentCardButton>
                            </ContinueContainer>
                        </PaymentCardButtonContainer>
                    </>
                );
            case "loading":
                return (
                    <Loading width={width / 8} />
                )
            case "notify":
                return (
                    <>
                        <PaymentCardTitle>
                            <h2>Thanh toán trực tiếp</h2>
                        </PaymentCardTitle>
                        <PaymentCardFix>
                            <PaymentCardContainer>
                                <PaymentCartNotifyImg>
                                    <Lottie animationData={go} loop autoPlay style={{ width: width / 8 }} />
                                </PaymentCartNotifyImg>
                            </PaymentCardContainer>
                            <h4>Hệ thống đã gửi thông báo đến quầy, quý khách vui lòng thanh toán tại quầy. Xin cảm ơn và hẹn gặp lại!</h4>
                        </PaymentCardFix>
                        <PaymentCardButton
                            isSecondary={true}
                            onClick={() => router.push("/")}
                        >
                            Trở về trang chủ
                        </PaymentCardButton>
                    </>
                )
        }
    }

    return (
        <ModalSection onOpenChange={() => { }} open={show} isTransparent={width <= 767}>
            <PaymentCard>
                {render(type)}
            </PaymentCard>
        </ModalSection>
    )
}