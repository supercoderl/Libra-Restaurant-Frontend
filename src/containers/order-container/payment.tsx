import { ModalSection } from "@/components/modal"
import React, { useState } from "react";
import { PaymentCard, PaymentCardButton, PaymentCardButtonContainer, PaymentCardContainer, PaymentCardFix, PaymentCardImage, PaymentCardTitle, PaymentCardType, PaymentCardTypeText, PaymentCartNotifyImg } from "./style";
import { paymentMethods } from "./item";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import go from "../../../public/assets/animation/go.json";
import { Loading } from "@/components/loading";
import Lottie from "lottie-react";

type PaymentProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    router: AppRouterInstance;
}

export const Payment: React.FC<PaymentProps> = ({ show, setShow, router }) => {
    const [selected, setSelected] = useState(paymentMethods[0].id);
    const [type, setType] = useState("payment");

    const onSubmit = () => {
        if (selected !== paymentMethods[0].id) {
            setType("loading");
        }
        else {
            setType("notify");
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
                            <div>
                                <PaymentCardButton isLink={true} onClick={() => setShow(false)}>Quay lại giỏ hàng</PaymentCardButton>
                                <PaymentCardButton
                                    isPrimary={true}
                                    onClick={onSubmit}
                                >
                                    Tiếp theo
                                </PaymentCardButton>
                            </div>
                        </PaymentCardButtonContainer>
                    </>
                );
            case "loading":
                return (
                    <Loading width={window.innerWidth / 8} />
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
                                    <Lottie animationData={go} loop autoPlay style={{ width: window.innerWidth / 8 }} />
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
        <ModalSection onOpenChange={() => { }} open={show}>
            <PaymentCard>
                {render(type)}
            </PaymentCard>
        </ModalSection>
    )
}