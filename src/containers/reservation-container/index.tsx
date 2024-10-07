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

type ReservationContainerProps = {
    tableNumber?: string | null;
    storeId?: string | null;
    reservationId?: string | null;
}

export default function ReservationContainer({ tableNumber, storeId, reservationId }: ReservationContainerProps) {
    const { items } = useStoreSelector(
        state => ({
            items: state.mainProductSlice.items
        }),
        shallowEqual,
    );

    useEffect(() => {
        if (!tableNumber || tableNumber === null || !storeId || storeId === null || !reservationId || reservationId === null) {
            toast("Giá trị không tồn tại, vui lòng quét mã qr được dán trên bàn!", {
                type: "error"
            });
            setTimeout(() => window.history.back(), 3000);
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
                                loading={false}
                                showTitle={false}
                                currentCategory={1}
                                items={items}
                                isReservation
                            />
                            {/* {
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
                            } */}
                        </ContentContainer>
                    </CenterContainer>
                </BodyContainer>
                <DarkThemeToggler />
            </Container>
        </>
    );
}
