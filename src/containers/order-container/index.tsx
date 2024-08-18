import { formatDate } from "@/utils/date";
import { BodyContainer, CartContainer, FluidContainer, CustomerCartText, HeaderContainer, HeaderText, HeaderTime, ImageDesktop, ImageItemContainer, ImageMobile, ItemContainer, ItemInfoContainer, ItemInfoMoreContainer, ItemInfoMoreText, ItemInfoPriceContainer, ItemInfoPriceDiscount, ItemInfoPriceText, ItemInfoPriceTotal, ItemInfoTextContainer, ItemInfoTitle, LeftContainer, Price, PriceCalculate, PriceCalculateContainer, PriceCalculateText, PriceCalculateTotal, PriceContainer, PriceTotal, PriceTotalNumber, PriceTotalText, RightContainer, ShippingText, Container, CenterContainer, Button, ButtonContainer } from "./style";
import { useStoreSelector } from "@/redux/store";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/enums";
import React, { useState } from "react";
import { get } from "@/utils/sesstionStorage";
import { actionOrder } from "@/api/business/orderApi";
import { Order } from "@/type/Order";
import { toast } from "react-toastify";
import { Loading } from "@/components/loading";
import { Spinner } from "@/components/loading/spinner";
import { Payment } from "./payment";

type OrderProps = {
    storeId: string;
    reservationId: number;
}

export default function OrderContainer({ storeId, reservationId }: OrderProps) {
    const router = useRouter();
    const orderId = get("orderId");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const { itemsInCart } = useStoreSelector(
        state => ({
            itemsInCart: state.cart.itemsInCart
        })
    );

    const calculatePriceItems = () => {
        if (itemsInCart && itemsInCart.length > 0) {
            const totalPrice = itemsInCart.reduce((total, e) => {
                return total + (e.item.price * e.quantityOrder);
            }, 0);
            return totalPrice;
        }
        return 0;
    }

    const onSubmit = async () => {
        setShow(true);
        // setLoading(true);
        // const body = {
        //     orderId: orderId,
        //     storeId,
        //     reservationId,
        //     priceCalculated: calculatePriceItems(),
        //     subtotal: calculatePriceItems(),
        //     tax: 0,
        //     total: calculatePriceItems(),
        //     latestStatus: OrderStatus.InPreperation,
        //     latestStatusUpdate: new Date(),
        //     isPaid: false,
        //     isPreparationDelayed: false,
        //     isCanceled: false,
        //     isReady: false,
        //     isCompleted: false
        // };

        // try {
        //     const res = await actionOrder(body as Order, "edit");
        //     if (res?.success) {

        //     }
        //     else {
        //         toast("Có lỗi xảy ra, vui lòng liên hệ nhân viên.", { type: "error" });
        //     }
        // }
        // catch (error) {
        //     console.log("Submit to pay: ", error);
        // }
        // finally {
        //     setTimeout(() => setLoading(false), 600);
        // }
    }

    return (
        <Container>
            <CenterContainer>
                <Header />
                <FluidContainer>
                    <HeaderContainer>
                        <HeaderText>Đã gọi món, mã đơn hàng: #13432</HeaderText>
                        <HeaderTime>{formatDate(new Date())}</HeaderTime>
                    </HeaderContainer>
                    <BodyContainer>
                        <LeftContainer>
                            <CartContainer>
                                <CustomerCartText>Giỏ hàng</CustomerCartText>
                                {
                                    itemsInCart && itemsInCart.length > 0 &&
                                    itemsInCart.map((e, index) => (
                                        <ItemContainer key={index}>
                                            <ImageItemContainer>
                                                <ImageDesktop src={e.item?.picture || process.env.NEXT_PUBLIC_DUMMY_PICTURE} alt="item" />
                                                <ImageMobile src={e.item?.picture || process.env.NEXT_PUBLIC_DUMMY_PICTURE} alt="item" />
                                            </ImageItemContainer>
                                            <ItemInfoContainer>
                                                <ItemInfoTextContainer>
                                                    <ItemInfoTitle>{e.item.title}</ItemInfoTitle>
                                                    <ItemInfoMoreContainer>
                                                        <ItemInfoMoreText><span>Style: </span> Italic Minimal Design</ItemInfoMoreText>
                                                        <ItemInfoMoreText><span>Size: </span> Small</ItemInfoMoreText>
                                                        <ItemInfoMoreText><span>Color: </span> Light Blue</ItemInfoMoreText>
                                                    </ItemInfoMoreContainer>
                                                </ItemInfoTextContainer>
                                                <ItemInfoPriceContainer>
                                                    <ItemInfoPriceText>{e.item.price} ₫ <ItemInfoPriceDiscount> 45000 ₫</ItemInfoPriceDiscount></ItemInfoPriceText>
                                                    <ItemInfoPriceText>{e.quantityOrder}</ItemInfoPriceText>
                                                    <ItemInfoPriceTotal>{e.item.price * e.quantityOrder} ₫</ItemInfoPriceTotal>
                                                </ItemInfoPriceContainer>
                                            </ItemInfoContainer>
                                        </ItemContainer>
                                    ))
                                }
                            </CartContainer>

                        </LeftContainer>
                        <RightContainer>
                            <PriceContainer>
                                <Price>
                                    <ShippingText>Tổng kết hóa đơn</ShippingText>
                                    <PriceCalculate>
                                        <PriceCalculateContainer>
                                            <PriceCalculateText>Tạm tính</PriceCalculateText>
                                            <PriceCalculateTotal>{calculatePriceItems()} ₫</PriceCalculateTotal>
                                        </PriceCalculateContainer>
                                        <PriceCalculateContainer>
                                            <PriceCalculateText>Khuyến mãi</PriceCalculateText>
                                            <PriceCalculateTotal>0 ₫</PriceCalculateTotal>
                                        </PriceCalculateContainer>
                                        <PriceCalculateContainer>
                                            <PriceCalculateText>Thuế</PriceCalculateText>
                                            <PriceCalculateTotal>10%</PriceCalculateTotal>
                                        </PriceCalculateContainer>
                                    </PriceCalculate>
                                    <PriceTotal>
                                        <PriceTotalText>Tổng cộng</PriceTotalText>
                                        <PriceTotalNumber>{calculatePriceItems() + calculatePriceItems() * 10 / 100} ₫</PriceTotalNumber>
                                    </PriceTotal>
                                </Price>

                                <ButtonContainer>
                                    <Button onClick={() => router.back()}>Gọi tiếp</Button>
                                    <Button onClick={onSubmit} className="group">
                                        {
                                            loading && <Spinner width={15} />
                                        }
                                        Thanh toán
                                    </Button>
                                </ButtonContainer>
                            </PriceContainer>
                        </RightContainer>
                    </BodyContainer>
                </FluidContainer>
            </CenterContainer>

            <Payment show={show} setShow={setShow} router={router}/>
        </Container>
    )
}