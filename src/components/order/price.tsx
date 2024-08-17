import { useStoreSelector } from "@/redux/store";
import { Component, ComponentInfo, Container, NormalPrice, PriceContainer, Title } from "./style"

export const OrderPrice = () => {
    const { itemsInCart } = useStoreSelector(
        state => ({
            itemsInCart: state.cart.itemsInCart
        }),
    );

    const calculatePriceItems = () => {
        if(itemsInCart && itemsInCart.length > 0)
        {
            const totalPrice = itemsInCart.reduce((total, e) => {
                return total + (e.item.price * e.quantityOrder);
            }, 0);
            return totalPrice;
        }
        return 0;
    }

    return (
        <Container>
            <Component>
                <ComponentInfo>
                    <Title>Chi phí thanh toán</Title>

                    <PriceContainer>
                        <NormalPrice>Đã tính: &nbsp; <b>{calculatePriceItems()} ₫</b></NormalPrice>
                    </PriceContainer>
                    <PriceContainer>
                        <NormalPrice>Thuế: &nbsp; <b>10%</b></NormalPrice>
                    </PriceContainer>
                    <PriceContainer>
                        <NormalPrice>Tổng thu: &nbsp; <b>{calculatePriceItems() + calculatePriceItems() * 10 / 100} ₫</b></NormalPrice>
                    </PriceContainer>
                </ComponentInfo>
            </Component>
        </Container>
    )
}