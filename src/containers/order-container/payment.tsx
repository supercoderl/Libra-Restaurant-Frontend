import { ModalSection } from "@/components/modal"
import React, { useState } from "react";
import { ContinueContainer, PaymentCard, PaymentCardButton, PaymentCardButtonContainer, PaymentCardContainer, PaymentCardFix, PaymentCardImage, PaymentCardTitle, PaymentCardType, PaymentCardTypeText, PaymentCartNotifyImg } from "./style";
import { paymentMethods } from "./item";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import go from "../../../public/assets/animation/go.json";
import { Loading } from "@/components/loading";
import Lottie from "lottie-react";
import { pay } from "@/api/business/paymentApi";
import { convertVNDToUSD } from "@/utils/currency";
import useWindowDimensions from "@/hooks/use-window-dimensions";

type PaymentProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    router: AppRouterInstance;
    orderId: string;
    amount: number;
}

export const Payment: React.FC<PaymentProps> = ({ show, setShow, router, orderId, amount }) => {
    const [selected, setSelected] = useState(paymentMethods[0].id);
    const [type, setType] = useState("payment");
    const { width } = useWindowDimensions();

    const onSubmit = () => {
        if (selected !== paymentMethods[0].id) {
            setType("loading");
            setTimeout(async () => {
                const method = paymentMethods.find(x => x.id === selected);
                if (method) {
                    await onPost(method.title)
                };
            }, 600);
        }
        else {
            setType("notify");
        }
    }

    const onPost = async (type: string) => {
        var body = {};
        switch (type) {
            case "Paypal":
                body = {
                    reference: orderId, //Đổi order id,
                    currency: "USD",
                    value: convertVNDToUSD(amount)
                };
                break;
            case "VNPay":
                body = {
                    isQR: false,
                    isVNBank: true,
                    isIntCard: false,
                    amount,
                    orderID: orderId, //Đổi order id,
                    status: "0"
                }
                break;
            case "Stripe":
                body = {
                    amount,
                    currency: "VND",
                    name: "Thanh toan hoa don",
                    description: "text",
                    quantity: 1,
                    mode: "",
                    customerEmail: ""
                }
                break;
            case "PayOS":
                body = {
                    productName: "Ten san pham",
                    description: "Mo ta",
                    price: amount,
                    orderID: orderId
                }
                break;
        };
        try {
            const res = await pay(body, type);
            if(res?.success && res.data)
            {
                switch (type)
                {
                    case "Paypal":
                        window.open(res.data.links[1].href, "_blank");
                        break;
                    case "VNPay":
                        window.open(res.data, "_blank");
                        break;
                    case "PayOS":
                        window.open(res.data.checkoutUrl, "_blank");
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
                                                key={item.id}
                                                className={`group type ${selected === item.id && 'selected'}`}
                                                isSelected={selected === item.id}
                                                onClick={() => setSelected(item.id)}
                                            >
                                                <PaymentCardImage src={item.img} alt={item.title} />
                                                <PaymentCardTypeText>
                                                    <p>{item.title}</p>
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