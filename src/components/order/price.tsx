import { Component, ComponentInfo, Container, NormalPrice, PriceContainer, Title } from "./style"

export const OrderPrice = () => {
    return (
        <Container>
            <Component>
                <ComponentInfo>
                    <Title>Chi phí thanh toán</Title>

                    <PriceContainer>
                        <NormalPrice>Đã tính: &nbsp; <b>92000 VND</b></NormalPrice>
                    </PriceContainer>
                    <PriceContainer>
                        <NormalPrice>Thuế: &nbsp; <b>10%</b></NormalPrice>
                    </PriceContainer>
                    <PriceContainer>
                        <NormalPrice>Tổng thu: &nbsp; <b>120000 VND</b></NormalPrice>
                    </PriceContainer>
                </ComponentInfo>
            </Component>
        </Container>
    )
}