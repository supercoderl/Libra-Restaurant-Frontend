import { actionMenu, menu } from "@/api/business/menuApi";
import { MenuForm } from "@/forms/menu";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const MenuAction: NextPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['name'], value: '' },
        { name: ['storeId'], value: '' },
        { name: ['description'], value: '' },
        { name: ['isActive'], value: true }
    ]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("Thêm mới thực đơn");

    const onLoad = async () => {
        if (searchParams.get('menuId')) {
            try {
                const res = await menu(Number(searchParams.get('menuId')));
                if (res && res.success) {
                    setFields([
                        { name: 'name', value: res.data?.name },
                        { name: 'storeId', value: res.data?.storeId },
                        { name: 'description', value: res.data?.description || '' },
                        { name: 'isActive', value: res.data?.isActive }
                    ]);
                    setState("Cập nhật thực đơn");
                }
            }
            catch (error) {
                console.log("Get menu by id: ", error);
            }
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (searchParams.get('menuId')) {
                values = { ...values, menuId: Number(searchParams.get('menuId')) };
            }

            const res = await actionMenu(values, searchParams.get('menuId') ? 'edit' : 'create');
            if (res && res.success) {
                toast(`${searchParams.get('menuId') ? 'Cập nhật' : 'Tạo mới'} thành công`, {
                    type: "success"
                });
                router.push("general");
            }
        }
        catch (error) {
            console.log("Action with menu: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return <MenuForm
        fields={fields}
        onChange={(newFields) => {
            setFields(newFields);
        }}
        title={state}
        onFinish={onFinish}
        loading={loading}
    />
}

export default MenuAction;