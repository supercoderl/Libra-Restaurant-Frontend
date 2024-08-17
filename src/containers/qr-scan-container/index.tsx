import Header from "@/components/header";
import { BodyContainer, CenterContainer, Container, TitleContainer } from "./style";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Title } from "@/components/title";
import { useRouter } from "next/navigation";
import { Status } from "@/enums";
import { useEffect, useState } from "react";
import { ModalSection } from "@/components/modal";
import { getStatus } from "@/redux/slices/reservation-slice";
import { useStoreDispatch, useStoreSelector } from "@/redux/store";
import Step1 from "./step1";
import Step2 from "./step2";

export default function QRScanContainer() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const dispatch = useStoreDispatch();
    const status = useStoreSelector(state => state.reservation.status);
    const [jsonValue, setJsonValue] = useState<any>(null);
    const [step, setStep] = useState(1);
    const [pause, setPause] = useState(false);

    // Function to move to the next step
    const handleNextStep = () => {
        setStep(step + 1);
    };

    // Function to move to the previous step
    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const onScan = (scannedValue: any) => {
        setJsonValue(scannedValue);
        if (scannedValue?.reservationId) {
            dispatch(getStatus(Number(scannedValue.reservationId)));
        }
        setPause(true);
    };

    const onSubmit = () => {
        setPause(false);
        setShow(false);
        setStep(1);
    }

    useEffect(() => {
        if (jsonValue && status !== -1) {
            switch (status) {
                case Status.Available:
                    router.push(`reservation/val?reservationId=${jsonValue?.reservationId}&tableNumber=${jsonValue?.tableNumber}&storeId=${jsonValue?.storeId}`);
                    break;
                default:
                    setShow(true);
                    break;
            }
        }
    }, [status, jsonValue, router]);

    return (
        <>
            <Container>
                <BodyContainer>
                    <CenterContainer>
                        <Header />
                        <TitleContainer>
                            <Title>Quét mã để order</Title>
                        </TitleContainer>
                        <Scanner
                            onScan={(result) => onScan(JSON.parse(result[0].rawValue))}
                            paused={pause}
                            styles={{
                                container: { width: 350, height: 350 }
                            }}
                        />
                    </CenterContainer>
                </BodyContainer>
            </Container>
            <ModalSection onOpenChange={() => { }} open={show}>
                {step === 1 && <Step1 onNext={handleNextStep} status={status} onClose={onSubmit}/>}
                {step === 2 && <Step2 onPrevious={handlePreviousStep} status={status} onSubmit={onSubmit}/>}
            </ModalSection>
        </>
    );
}