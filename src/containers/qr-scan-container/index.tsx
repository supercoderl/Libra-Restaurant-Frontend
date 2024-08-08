import Header from "@/components/header";
import { BodyContainer, CenterContainer, Container, TitleContainer } from "./style";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Title } from "@/components/title";


export default function QRScanContainer() {

    return (
        <Container>
            <BodyContainer>
                <CenterContainer>
                    <Header />
                    <TitleContainer>
                        <Title>Quét mã để order</Title>
                    </TitleContainer>
                    <Scanner
                        onScan={(result) => console.log(result)}
                        styles={{
                            container: { width: 350, height: 350 }
                        }}
                    />
                </CenterContainer>
            </BodyContainer>
        </Container>
    );
}
