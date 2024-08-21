import { Avatar, Image } from "antd"
import { Address, Container, HorizontalLine, InvoiceItems, InvoiceItem, ItemTable, Price, PriceTable, Section, Title, TotalTable } from "./style"
import useWindowDimensions from "@/hooks/use-window-dimensions"

type InvoiceProps = {

}

export const Invoice = () => {
    const { width } = useWindowDimensions();

    return (
        <Section>
            <Container>
                <Avatar
                    size={width / 10}
                    src="https://res.cloudinary.com/dcystvroz/image/upload/v1724204618/Restaurant/logo/gyltrkd5sjmkfi7p1a98.png"
                    shape="square"
                />

                <Title>
                    Hóa đơn thanh toán
                </Title>
                <Address>
                    52 Đ. Nguyễn Thị Minh Khai, Bến Nghé, Quận 1, Hồ Chí Minh, Việt Nam
                </Address>
                <p>
                    <b>Số hóa đơn:</b> 0987653456789
                </p>
                <p>
                    <b>Số đơn hàng:</b> 0987653456789
                </p>
                <p>
                    <b>Mã số thuế:</b> 0987653456789
                </p>
                <HorizontalLine />
            </Container>
            <ItemTable>
                <thead>
                    <tr>
                        <InvoiceItem style={{ width: 60, textAlign: 'center', fontWeight: '700' }}>STT</InvoiceItem>
                        <InvoiceItem style={{ textAlign: 'left', fontWeight: '700'}}>Tên món</InvoiceItem>
                        <InvoiceItem style={{ width: 120, textAlign: 'center', fontWeight: '700' }}>Số lượng</InvoiceItem>
                        <InvoiceItem style={{ textAlign: 'right', fontWeight: '700'}}>Đơn giá</InvoiceItem>
                    </tr>
                </thead>
                <tbody>
                    <InvoiceItems>
                        <InvoiceItem style={{ width: 60, textAlign: 'center' }}>01</InvoiceItem>
                        <InvoiceItem style={{ textAlign: 'left'}}>Tropicana Purenectar Pomegr</InvoiceItem>
                        <InvoiceItem style={{ width: 120, textAlign: 'center' }}>5 PC</InvoiceItem>
                        <Price>₹ 100</Price>
                    </InvoiceItems>
                    <InvoiceItems>
                        <InvoiceItem style={{ width: 60, textAlign: 'center' }}>02</InvoiceItem>
                        <InvoiceItem style={{ textAlign: 'left'}}>Tropicana Purenectar Pomegr</InvoiceItem>
                        <InvoiceItem style={{ width: 120, textAlign: 'center' }}>5 PC</InvoiceItem>
                        <Price>₹ 100</Price>
                    </InvoiceItems>
                    <InvoiceItems>
                        <InvoiceItem style={{ width: 60, textAlign: 'center' }}>03</InvoiceItem>
                        <InvoiceItem style={{ textAlign: 'left'}}>Tropicana Purenectar Pomegr</InvoiceItem>
                        <InvoiceItem style={{ width: 120, textAlign: 'center' }}>5 PC</InvoiceItem>
                        <Price>₹ 100</Price>
                    </InvoiceItems>
                    <InvoiceItems>
                        <InvoiceItem style={{ width: 60, textAlign: 'center' }}>04</InvoiceItem>
                        <InvoiceItem style={{ textAlign: 'left'}}>Tropicana Purenectar Pomegr</InvoiceItem>
                        <InvoiceItem style={{ width: 120, textAlign: 'center' }}>5 PC</InvoiceItem>
                        <Price>₹ 100</Price>
                    </InvoiceItems>
                </tbody>
            </ItemTable>

            <TotalTable>
                <thead>
                    <tr>
                        <td style={{ paddingLeft: 10, paddingBlock: 5 }}>Tổng cộng: </td>
                        <Price style={{ paddingRight: 5, fontWeight: '700'}}>₹ 396</Price>
                    </tr>
                </thead>
            </TotalTable>
        </Section>
    )
}