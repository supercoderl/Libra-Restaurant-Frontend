import { formatDate } from "@/utils/date";
import { BodyContainer, CartContainer, FluidContainer, CustomerCartText, HeaderContainer, HeaderText, HeaderTime, ImageDesktop, ImageItemContainer, ImageMobile, ItemContainer, ItemInfoContainer, ItemInfoMoreContainer, ItemInfoMoreText, ItemInfoPriceContainer, ItemInfoPriceDiscount, ItemInfoPriceText, ItemInfoPriceTotal, ItemInfoTextContainer, ItemInfoTitle, LeftContainer, Price, PriceCalculate, PriceCalculateContainer, PriceCalculateText, PriceCalculateTotal, PriceContainer, PriceTotal, PriceTotalNumber, PriceTotalText, RightContainer, ShippingText, Container, CenterContainer, Button, ButtonContainer, QuantityContainer, QuantityButton, ItemInfoPriceContainerMobile, PromoContainer, PromoInput, PromoButtonContainer, PromoButton, PromoSvg } from "./style";
import { useStoreSelector } from "@/redux/store";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/enums";
import React, { useEffect, useState } from "react";
import { get } from "@/utils/sesstionStorage";
import { actionOrder, order } from "@/api/business/orderApi";
import { Order } from "@/type/Order";
import { Spinner } from "@/components/loading/spinner";
import { Payment } from "./payment";
import AddIcon from '../../../public/assets/icons/add-icon.svg';
import SubtractIcon from '../../../public/assets/icons/subtract-icon.svg';

export default function OrderContainer() {
    const router = useRouter();
    const [orderId, setOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [orderS, setOrderS] = useState<Order | null>(null);
    const [count, setCount] = useState(0);

    const { itemsInCart, id, storeId } = useStoreSelector(
        state => ({
            itemsInCart: state.cart.itemsInCart,
            id: state.reservation.id,
            storeId: state.reservation.storeId
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
        setLoading(true);
        const body = {
            storeId,
            reservationId: Number(id),
            priceCalculated: calculatePriceItems(),
            subtotal: calculatePriceItems(),
            tax: 0,
            total: calculatePriceItems(),
            latestStatus: OrderStatus.InPreperation,
            latestStatusUpdate: new Date(),
            isPaid: false,
            isPreparationDelayed: false,
            isCanceled: false,
            isReady: false,
            isCompleted: false
        } as any;

        try {
            let response;
            if (orderId) {
                body.orderId = orderId;
                response = await actionOrder(body as Order, "edit");
                setCount(count + 1);
            }
            else {
                response = await actionOrder(body as Order, "create");
                setCount(count + 1);
            }
        }
        catch (error) {
            console.log("Submit to pay: ", error);
        }
        finally {
            setTimeout(() => setLoading(false), 600);
        }
    }

    //? Init
    useEffect(() => {
        const id = get("orderId");
        if (id) setOrderId(id);
    }, []);

    //? Focus On Mount
    useEffect(() => {
        const getOrder = async () => {
            const res = await order(orderId || "");
            console.log(res);
            // if (res && res?.data && res?.data?.data) {
            //     setOrderS(res?.data?.data);
            // }
        }

        orderId && getOrder();
    }, [count, orderId]);

    return (
        <Container>
            <CenterContainer>
                <Header />
                <FluidContainer>
                    <HeaderContainer>
                        <HeaderText>Giỏ hàng của tôi, mã đơn hàng: #13432</HeaderText>
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
                                                <ItemInfoPriceContainerMobile>
                                                    <ItemInfoPriceTotal>{e.item.price * e.quantityOrder} ₫</ItemInfoPriceTotal>
                                                    <QuantityContainer>
                                                        <QuantityButton>
                                                            <AddIcon width={16} fill="white" />
                                                        </QuantityButton>
                                                        <ItemInfoPriceText>{e.quantityOrder}</ItemInfoPriceText>
                                                        <QuantityButton>
                                                            <SubtractIcon width={16} fill="white" />
                                                        </QuantityButton>
                                                    </QuantityContainer>
                                                </ItemInfoPriceContainerMobile>
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
                                        <PromoContainer>
                                            <PromoInput
                                                type="text"
                                                placeholder="Nhập mã giảm giá"
                                            />
                                            <PromoButtonContainer>
                                                <PromoButton
                                                    type="submit"
                                                    aria-label="Submit"
                                                >
                                                    <PromoSvg viewBox="0 0 16 6" aria-hidden="true">
                                                        <path
                                                            fill="currentColor"
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                                                        ></path>
                                                    </PromoSvg>
                                                </PromoButton>
                                            </PromoButtonContainer>
                                        </PromoContainer>
                                    </PriceCalculate>
                                    <PriceTotal>
                                        <PriceTotalText>Tổng cộng</PriceTotalText>
                                        <PriceTotalNumber>{calculatePriceItems() + calculatePriceItems() * 10 / 100} ₫</PriceTotalNumber>
                                    </PriceTotal>
                                    <ButtonContainer>
                                        <Button onClick={() => router.back()}>Hủy đơn</Button>
                                        <Button onClick={onSubmit} className="group">
                                            {
                                                loading && <Spinner width={15} />
                                            }
                                            Gọi món
                                        </Button>
                                    </ButtonContainer>
                                </Price>

                                <ButtonContainer>
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

            <Payment
                show={show}
                setShow={setShow}
                router={router}
                orderId={orderId || ""}
                amount={calculatePriceItems() + calculatePriceItems() * 10 / 100}
            />
        </Container>
    )
}