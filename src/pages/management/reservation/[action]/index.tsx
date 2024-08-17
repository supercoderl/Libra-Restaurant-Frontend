import { actionReservation, reservation } from "@/api/business/reservationApi";
import { stores } from "@/api/business/storeApi";
import { ReservationForm } from "@/forms/reservation";
import { Store } from "@/type/Store";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const ReservationAction: NextPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['tableNumber'], value: '' },
        { name: ['capacity'], value: '' },
        { name: ['storeId'], value: '' },
        { name: ['status'], value: 0 },
        { name: ['description'], value: '' },
        { name: ['reservationTime'], value: dayjs(new Date()) },
        { name: ['customerName'], value: '' },
        { name: ['customerPhone'], value: '' }
    ]);
    const [storeDatas, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("Thêm mới đặt chỗ");

    const onLoad = async () => {
        if (searchParams.get('reservationId')) {
            try {
                const res = await reservation(Number(searchParams.get('reservationId')));
                if (res && res.success) {
                    setFields([
                        { name: 'tableNumber', value: res.data?.tableNumber },
                        { name: 'capacity', value: res.data?.capacity },
                        { name: 'storeId', value: res.data?.storeId },
                        { name: 'status', value: res.data?.status },
                        { name: 'description', value: res.data?.description || '' },
                        { name: 'reservationTime', value: undefined },
                        { name: 'customerName', value: res.data?.customerName || '' },
                        { name: 'customerPhone', value: res.data?.customerPhone || '' }
                    ]);
                    setState("Cập nhật đặt chỗ");
                }
            }
            catch (error) {
                console.log("Get reservation by id: ", error);
            }
        }
    };

    const getStoresAsync = async () => {
        try {
            const res = await stores();
            if(res?.success && res?.data && res?.data.count > 0) setStores(res?.data.items); 
        }
        catch (error) {
            console.log("Get stores: ", error);
        }
    }

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (searchParams.get('reservationId')) {
                values = { ...values, reservationId: Number(searchParams.get('reservationId')) };
            }
            else {
                values = {
                    ...values,
                    tableNumber: Number(values.tableNumber),
                    capacity: Number(values.capacity),
                    reservationTime: null,
                    status: 0,
                    description: values.description === '' ? null : values.description,
                    customerName: values.customerName === '' ? null : values.customerName,
                    customerPhone: values.customerPhone === '' ? null : values.customerPhone
                }
            }
            
            const res = await actionReservation(values, searchParams.get('reservationId') ? 'edit' : 'create');
            if (res && res.success) {
                toast(`${searchParams.get('reservationId') ? 'Cập nhật' : 'Tạo mới'} thành công`, {
                    type: "success"
                });
                router.push("general");
            }
        }
        catch (error) {
            console.log("Action with reservation: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
        getStoresAsync();
    }, []);

    return <ReservationForm
        fields={fields}
        onChange={(newFields) => {
            setFields(newFields);
        }}
        title={state}
        onFinish={onFinish}
        loading={loading}
        stores={storeDatas}
    />
}

export default ReservationAction;