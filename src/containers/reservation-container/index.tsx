import Header from "@/components/header";
import { CenterContainer, BodyContainer, Container, ContentContainer, OrderContainer, ModalHeader, ModalBody, ModalBodyStatus, ModalBodyFormGroup, ModalBodyFormInput, ModalBodyFormLabel, ModalActionButton, ModalActionSvg, ModalActionText, ModalBodyFormContainer, ModalActionContainer } from "./style";
import { Food } from "../home-container/food";
import DarkThemeToggler from "@/components/dark-theme-toggler";
import { useStoreSelector } from "src/redux/store";
import { shallowEqual } from "react-redux";
import { Order } from "@/components/order";
import { Hero } from "@/components/hero";
import { OrderPrice } from "@/components/order/price";
import { SecondCategory } from "@/components/food-category/second-category";
import { ModalSection } from "@/components/modal";
import { useState } from "react";

export default function ReservationContainer() {
    const { products } = useStoreSelector(
        state => ({
            products: state.mainStoreSlice.products
        }),
        shallowEqual,
    );

    const [open, setOpen] = useState(false);

    const onOpenChange = () => setOpen(!open);

    return (
        <>
            <Container>
                <BodyContainer onClick={() => setOpen(true)}>
                    <CenterContainer>
                        <Header />
                        <Hero />
                        <SecondCategory />
                        <ContentContainer>
                            <Food showTitle={false} currentCategory={1} products={products} isReservation />
                            <OrderContainer>
                                <OrderPrice />
                                <Order />
                            </OrderContainer>
                        </ContentContainer>
                    </CenterContainer>
                </BodyContainer>
                <DarkThemeToggler />
            </Container>
            <ModalSection onOpenChange={onOpenChange} open={open}>
                <ModalHeader>Thông tin khách hàng</ModalHeader>
                <ModalBody>
                    <ModalBodyStatus>Trạng thái bàn: Đang trống</ModalBodyStatus>
                    <ModalBodyFormContainer>
                        <ModalBodyFormGroup>
                            <ModalBodyFormLabel htmlFor="name">Tên khách hàng</ModalBodyFormLabel>
                            <ModalBodyFormInput placeholder="Nhập tên" type="text" />
                        </ModalBodyFormGroup>
                        <ModalBodyFormGroup>
                            <ModalBodyFormLabel htmlFor="phone">Số điện thoại</ModalBodyFormLabel>
                            <ModalBodyFormInput placeholder="Nhập số điện thoại" id="phone" type="text" />
                        </ModalBodyFormGroup>
                        <ModalActionContainer>
                            <ModalActionButton className="group" isOutlined>
                                <ModalActionSvg isOutlined width="20px" height="20px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
                                    <path d="M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,10c3.1,0,6,1.1,8.4,2.8L12.8,32.4 C11.1,30,10,27.1,10,24C10,16.3,16.3,10,24,10z M24,38c-3.1,0-6-1.1-8.4-2.8l19.6-19.6C36.9,18,38,20.9,38,24C38,31.7,31.7,38,24,38 z" />
                                </ModalActionSvg>
                                <ModalActionText isOutlined>Hủy bỏ</ModalActionText>
                            </ModalActionButton>

                            <ModalActionButton className="group">
                                <ModalActionSvg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="20px" height="20px" viewBox="0 0 36.946 36.945" xmlSpace="preserve">
                                    <g>
                                        <path d="M34.326,11.616c-0.285-0.492-0.744-0.842-1.293-0.988l-0.979-0.26V9.354c0-1.172-0.954-2.127-2.127-2.127h-3.131V5.129
                                        C26.796,2.301,24.493,0,21.665,0c-2.831,0-5.13,2.301-5.13,5.129v1.109l-5.64-1.5c-1.118-0.293-2.31,0.403-2.601,1.51L8.031,7.227
                                        H7.017c-1.172,0-2.126,0.955-2.126,2.127v9.678l-2.487,9.354c-0.146,0.549-0.07,1.123,0.215,1.611
                                        c0.287,0.492,0.746,0.846,1.295,0.988l0.979,0.262v1.014c0,1.172,0.954,2.127,2.126,2.127h9.677l9.355,2.486
                                        c0.179,0.049,0.361,0.07,0.548,0.07c0.961,0,1.807-0.646,2.055-1.58l0.262-0.979h1.013c1.173,0,2.127-0.955,2.127-2.127v-9.677
                                        l2.487-9.355C34.687,12.68,34.611,12.108,34.326,11.616z M18.534,5.129c0-1.725,1.405-3.129,3.13-3.129
                                        c1.727,0,3.132,1.404,3.132,3.129v2.098h-4.548l-1.714-0.455V5.129z M26.721,34.852c-0.02,0.064-0.076,0.095-0.122,0.095
                                        l-22.17-5.894l-0.09-0.154L10.228,6.76c0.016-0.059,0.066-0.088,0.139-0.088c0.006,0,0.012,0,0.017,0l14.414,3.834v4.574
                                        c0,1.727-1.404,3.133-3.132,3.133c-1.727,0-3.13-1.406-3.13-3.133v-2.435c0-0.553-0.447-1-1-1s-1,0.447-1,1v2.435
                                        c0,2.83,2.301,5.133,5.13,5.133c2.828,0,5.132-2.303,5.132-5.133v-4.041l5.724,1.521l0.089,0.154L26.721,34.852z"/>
                                    </g>
                                </ModalActionSvg>
                                <ModalActionText>Tiếp tục</ModalActionText>
                            </ModalActionButton>
                        </ModalActionContainer>
                    </ModalBodyFormContainer>
                </ModalBody>
            </ModalSection>
        </>
    );
}
