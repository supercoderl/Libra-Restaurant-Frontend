import OrderContainer from "@/containers/order-container";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

const Order: NextPage = () => {
    const searchParams = useSearchParams();
    const storeId = searchParams.get("storeId");
    const reservationId = searchParams.get("reservationId");

    if (!storeId || !reservationId) {
        return <></>
    }
    return <OrderContainer
        storeId={storeId}
        reservationId={Number(reservationId)}
    />
}

export default Order;