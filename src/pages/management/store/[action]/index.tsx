
import { actionStore, store } from "@/api/business/storeApi";
import { StoreForm } from "@/forms/store";
import { Store } from "@/type/Store";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const StoreAction: NextPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['name'], value: '' },
        { name: ['cityId'], value: 1 },
        { name: ['disctrictId'], value: 1 },
        { name: ['wardId'], value: 1 },
        { name: ['taxCode'], value: '' },
        { name: ['address'], value: '' },
        { name: ['gpsLocation'], value: '' },
        { name: ['postalCode'], value: '' },
        { name: ['phone'], value: '' },
        { name: ['fax'], value: '' },
        { name: ['email'], value: '' },
        { name: ['website'], value: '' },
        { name: ['logo'], value: '' },
        { name: ['bankBranch'], value: '' },
        { name: ['bankCode'], value: '' },
        { name: ['bankAccount'], value: '' },
        { name: ['isActive'], value: true }
    ]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("Thêm mới chi nhánh");

    const onLoad = async () => {
        if (searchParams.get('storeId')) {
            try {
                const res = await store(searchParams.get('storeId'));
                if (res && res.success) {
                    setFields([
                        { name: 'name', value: res.data?.name },
                        { name: 'cityId', value: res.data?.cityId },
                        { name: 'districtId', value: res.data?.districtId },
                        { name: 'wardId', value: res.data?.wardId },
                        { name: 'taxCode', value: res.data?.taxCode || '' },
                        { name: 'address', value: res.data?.address },
                        { name: 'gpsLocation', value: res.data?.gpsLocation || '' },
                        { name: 'postalCode', value: res.data?.postalCode || '' },
                        { name: 'phone', value: res.data?.phone || '' },
                        { name: 'fax', value: res.data?.fax || '' },
                        { name: 'email', value: res.data?.email || '' },
                        { name: 'website', value: res.data?.website || '' },
                        { name: 'logo', value: res.data?.logo || '' },
                        { name: 'bankBranch', value: res.data?.bankBranch || '' },
                        { name: 'bankCode', value: res.data?.bankCode || '' },
                        { name: 'bankAccount', value: res.data?.bankAccount || '' },
                        { name: 'isActive', value: res.data?.isActive }
                    ]);
                    setState("Cập nhật chi nhánh");
                }
            }
            catch (error) {
                console.log("Get store by id: ", error);
            }
        }
    };

    const onFinish = async () => {
        setLoading(true);
        let values = fields.reduce((acc, field) => {
            if (Array.isArray(field.name) && typeof field.name[0] === 'string') {
                acc[field.name[0]] = field.value;
            }
            return acc;
        }, {} as { [key: string]: any });

        try {
            if (searchParams.get('storeId')) {
                values = { ...values, storeId: searchParams.get('storeId') };
            }

            const res = await actionStore(values as Store, searchParams.get('storeId') ? 'edit' : 'create');
            if (res && res.success) {
                toast(`${searchParams.get('storeId') ? 'Cập nhật' : 'Tạo mới'} thành công`, {
                    type: "success"
                });
                router.push("general");
            }
        }
        catch (error) {
            console.log("Action with store: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return <StoreForm
        fields={fields}
        onChange={(newFields) => {
            setFields(newFields);
        }}
        title={state}
        onFinish={onFinish}
        loading={loading}
    />
}

export default StoreAction;