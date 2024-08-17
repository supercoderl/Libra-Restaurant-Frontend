import Header from "@/components/header";
import { CenterContainer, BodyContainer, Container, ContentContainer, OrderContainer } from "./style";
import { Food } from "../home-container/food";
import DarkThemeToggler from "@/components/dark-theme-toggler";
import { useStoreSelector } from "src/redux/store";
import { shallowEqual } from "react-redux";
import { Order } from "@/components/order";
import { Hero } from "@/components/hero";
import { OrderPrice } from "@/components/order/price";
import { SecondCategory } from "@/components/food-category/second-category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { actionOrder } from "@/api/business/orderApi";
import { generateOrderNo } from "@/utils/date";
import { OrderStatus } from "@/enums";
import { get, set } from "@/utils/sesstionStorage";

type ReservationContainerProps = {
    tableNumber?: string | null;
    storeId?: string | null;
    reservationId?: string | null;
}

export default function ReservationContainer({ tableNumber, storeId, reservationId }: ReservationContainerProps) {
    const [orderId, setOrderId] = useState(get("orderId"));

    const { items } = useStoreSelector(
        state => ({
            items: state.mainStoreSlice.items
        }),
        shallowEqual,
    );

    const onCreateOrder = async () => {
        const body = {
            orderNo: generateOrderNo(Number(tableNumber)),
            storeId: storeId,
            reservationId: Number(reservationId),
            priceCalculated: 0,
            subtotal: 0,
            tax: 0,
            total: 0,
            latestStatus: OrderStatus.Draft,
            latestStatusUpdate: new Date(),
            isPaid: false,
            isPreparationDelayed: false,
            isCanceled: false,
            isReady: false,
            isCompleted: false
        }
        try {
            const res = await actionOrder(body as any, "create");
            if (res?.success) {
                setOrderId(res.data);
                set("orderId", res.data);
            }
        }
        catch (error) {
            console.log("Create order: ", error);
        }
    }

    useEffect(() => {
        if (!tableNumber || tableNumber === null || !storeId || storeId === null || !reservationId || reservationId === null) {
            toast("Giá trị không tồn tại, vui lòng quét mã qr được dán trên bàn!", {
                type: "error"
            });
            setTimeout(() => window.history.back(), 3000);
        }
        if (!orderId) {
            console.log("Calling service!");
            onCreateOrder();
        }
    }, []);

    return (
        <>
            <Container>
                <BodyContainer>
                    <CenterContainer>
                        <Header />
                        <Hero />
                        <SecondCategory />
                        <ContentContainer>
                            <Food
                                showTitle={false}
                                currentCategory={1}
                                items={items}
                                isReservation
                            />
                            {
                                orderId &&
                                <OrderContainer>
                                    <OrderPrice />
                                    <Order
                                        orderId={orderId}
                                        tableNumber={Number(tableNumber) || 0}
                                        storeId={storeId}
                                        reservationId={Number(reservationId) || 0}
                                    />
                                </OrderContainer>
                            }
                        </ContentContainer>
                    </CenterContainer>
                </BodyContainer>
                <DarkThemeToggler />
            </Container>
        </>
    );
}
