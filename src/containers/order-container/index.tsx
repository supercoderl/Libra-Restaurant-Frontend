import { checkTimeDifference, formatDate, generateOrderNo } from "@/utils/date";
import { BodyContainer, CartContainer, FluidContainer, CustomerCartText, HeaderContainer, HeaderText, HeaderTime, ImageDesktop, ImageItemContainer, ImageMobile, ItemContainer, ItemInfoContainer, ItemInfoMoreContainer, ItemInfoMoreText, ItemInfoPriceContainer, ItemInfoPriceDiscount, ItemInfoPriceText, ItemInfoPriceTotal, ItemInfoTextContainer, ItemInfoTitle, LeftContainer, Price, PriceCalculate, PriceCalculateContainer, PriceCalculateText, PriceCalculateTotal, PriceContainer, PriceTotal, PriceTotalNumber, PriceTotalText, RightContainer, ShippingText, Container, CenterContainer, Button, ButtonContainer, QuantityContainer, QuantityButton, ItemInfoPriceContainerMobile, PromoContainer, PromoInput, PromoButtonContainer, PromoButton, PromoSvg } from "./style";
import { useStoreDispatch, useStoreSelector } from "@/redux/store";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/enums";
import React, { useEffect, useState } from "react";
import { actionOrder, order } from "@/api/business/orderApi";
import { Order } from "@/type/Order";
import { Spinner } from "@/components/loading/spinner";
import { Payment } from "./payment";
import AddIcon from '../../../public/assets/icons/add-icon.svg';
import CloseIcon from '../../../public/assets/icons/close-icon.svg';
import SubtractIcon from '../../../public/assets/icons/subtract-icon.svg';
import { ArrowEffect } from "@/components/arrows/effect";
import { changeQuantity, removeItem } from "@/redux/slices/cart-slice";
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';
import { get, set } from "@/utils/localStorage";
import { TFunction } from "i18next";
import { useSignalR } from "@/context/signalRProvider";

export default function OrderContainer({ t }: { t: TFunction<"translation", undefined> }) {
    const router = useRouter();
    const [orderId, setOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [orderS, setOrderS] = useState<Order | null>(null);
    const [count, setCount] = useState(0);
    const dispatch = useStoreDispatch();
    const { sendMessageToGroup } = useSignalR();
    const myTable = get("my-table");

    const { itemsInCart, id, storeId, tableNumber } = useStoreSelector(
        state => ({
            itemsInCart: state.cart.itemsInCart,
            id: state.reservation.id,
            storeId: state.reservation.storeId,
            tableNumber: state.reservation.tableNumber
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

    const onCancel = () => {
        if (orderS) {
            if (checkTimeDifference(orderS?.latestStatusUpdate, 10))
                toast(t("food-ready"), { type: "warning" });
        }
        else {
            toast(t("order-not-exists"), { type: "error" });
        }
    }

    const onSubmit = async () => {
        if (!id) {
            toast(t("you-have-not-reservation"), { type: "warning" });
            return;
        }
        else if (!myTable) {
            toast("Bàn của bạn xảy ra lỗi!", { type: "warning" });
            return;
        }

        setLoading(true);
        let body: any = {
            orderNo: generateOrderNo(Number(tableNumber)),
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
            isCompleted: false,
            orderLines: itemsInCart.map(e => ({
                orderId: uuid(),
                itemId: e.item.itemId,
                quantity: e.quantityOrder,
                isCanceled: false
            }))
        };

        try {
            let response;
            if (orderId) {
                body.orderId = orderId;
                body.action = "update";
                response = await actionOrder(body as Order, "edit");
                setCount(count + 1);
            }
            else {
                response = await actionOrder(body as Order, "create");
                setCount(count + 1);
                if (response && response.data) {
                    set("orderId", response.data);
                    setOrderId(response.data);
                };
            }
            await sendMessageToGroup(myTable, `Khách bàn số ${tableNumber} đã đặt món`);
            toast(t("order-success"), { type: "success" })
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
        const orderId = get("orderId");
        if (orderId && typeof orderId === "string") setOrderId(orderId);
    }, []);

    //? Focus On Mount
    useEffect(() => {
        const getOrder = async () => {
            const res = await order(orderId || "");
            if (res && res.data) {
                setOrderS(res.data);
            }
        }

        orderId && getOrder();
    }, [count, orderId]);

    return (
        <Container>
            <CenterContainer>
                <Header />
                <FluidContainer>
                    <HeaderContainer>
                        <HeaderText>{t("my-cart")}: #13432</HeaderText>
                        <HeaderTime>{formatDate(new Date(), t)}</HeaderTime>
                    </HeaderContainer>
                    <BodyContainer>
                        <LeftContainer>
                            <CartContainer>
                                <CustomerCartText>{t("cart")}</CustomerCartText>
                                {
                                    itemsInCart && itemsInCart.length > 0 &&
                                    itemsInCart.map((e, index) => {
                                        let orderLine;
                                        if (orderS && orderS.orderLines && orderS.orderLines.length > 0) {
                                            orderLine = orderS.orderLines.find((x: any) => x.itemId === e.item.itemId);
                                        }
                                        return (
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
                                                    <ItemInfoPriceContainerMobile>
                                                        <ItemInfoPriceTotal>{e.item.price * e.quantityOrder} ₫</ItemInfoPriceTotal>
                                                        <QuantityContainer>
                                                            <QuantityButton
                                                                isDisabled={false}
                                                                onClick={() => dispatch(changeQuantity({ id: e.item.itemId, quantity: e.quantityOrder + 1 }))}>
                                                                <AddIcon width={16} fill="white" />
                                                            </QuantityButton>
                                                            <ItemInfoPriceText>{e.quantityOrder}</ItemInfoPriceText>
                                                            <QuantityButton
                                                                isDisabled={orderLine && orderLine.quantity === e.quantityOrder}
                                                                disabled={orderLine && orderLine.quantity === e.quantityOrder}
                                                                onClick={() => {
                                                                    if (e.quantityOrder === 1) {
                                                                        dispatch(removeItem(e.item.itemId))
                                                                    }
                                                                    else {
                                                                        dispatch(changeQuantity({ id: e.item.itemId, quantity: e.quantityOrder - 1 }))
                                                                    }
                                                                }}
                                                            >
                                                                {
                                                                    e.quantityOrder === 1 ?
                                                                        <CloseIcon width={16} height={16} fill="white" />
                                                                        :
                                                                        <SubtractIcon width={16} fill="white" />
                                                                }
                                                            </QuantityButton>
                                                        </QuantityContainer>
                                                    </ItemInfoPriceContainerMobile>
                                                </ItemInfoContainer>
                                            </ItemContainer>
                                        )
                                    })
                                }
                            </CartContainer>

                        </LeftContainer>
                        <RightContainer>
                            <PriceContainer>
                                <Price>
                                    <ShippingText>{t("summary-of-invoice")}</ShippingText>
                                    <PriceCalculate>
                                        <PriceCalculateContainer>
                                            <PriceCalculateText>{t("subtotal")}</PriceCalculateText>
                                            <PriceCalculateTotal>{calculatePriceItems()} ₫</PriceCalculateTotal>
                                        </PriceCalculateContainer>
                                        <PriceCalculateContainer>
                                            <PriceCalculateText>{t("sale")}</PriceCalculateText>
                                            <PriceCalculateTotal>0 ₫</PriceCalculateTotal>
                                        </PriceCalculateContainer>
                                        <PriceCalculateContainer>
                                            <PriceCalculateText>{t("tax")}</PriceCalculateText>
                                            <PriceCalculateTotal>10%</PriceCalculateTotal>
                                        </PriceCalculateContainer>
                                        <PromoContainer>
                                            <PromoInput
                                                type="text"
                                                placeholder={t("input-discount")}
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
                                        <PriceTotalText>{t("total")}</PriceTotalText>
                                        <PriceTotalNumber>{calculatePriceItems() + calculatePriceItems() * 10 / 100} ₫</PriceTotalNumber>
                                    </PriceTotal>
                                    <ButtonContainer>
                                        <Button onClick={onCancel}>{t("cancel")}</Button>
                                        <Button onClick={onSubmit} className="group">
                                            {
                                                loading && <Spinner width={15} />
                                            }
                                            {t("order")}
                                        </Button>
                                    </ButtonContainer>

                                    <ArrowEffect t={t} />
                                </Price>

                                <ButtonContainer>
                                    <Button onClick={() => setShow(true)} className="group">
                                        {t("pay")}
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