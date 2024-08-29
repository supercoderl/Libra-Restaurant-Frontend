import { actionItem, item } from "@/api/business/itemApi";
import { ItemForm } from "@/forms/item";
import Item from "@/type/Item";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const ItemAction: NextPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['title'], value: '' },
        { name: ['slug'], value: '' },
        { name: ['summary'], value: '' },
        { name: ['sku'], value: '' },
        { name: ['price'], value: '' },
        { name: ['quantity'], value: '' },
        { name: ['recipe'], value: '' },
        { name: ['instruction'], value: '' },
        { name: ['picture'], value: [] }
    ]);
    const [src, setSrc] = useState("");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("Thêm mới sản phẩm");

    const onLoad = async () => {
        if (searchParams.get('itemId')) {
            try {
                const res = await item(Number(searchParams.get('itemId')));
                if (res && res.success) {
                    setFields([
                        { name: 'title', value: res.data?.title },
                        { name: 'slug', value: res.data?.slug },
                        { name: 'summary', value: res.data?.summary || '' },
                        { name: 'sku', value: res.data?.sku },
                        { name: 'price', value: res.data?.price },
                        { name: 'quantity', value: res.data?.quantity },
                        { name: 'recipe', value: res.data?.recipe || '' },
                        { name: 'instruction', value: res.data?.instruction || '' }
                    ]);
                    setSrc(res.data?.picture || "")
                    setState("Cập nhật sản phẩm");
                }
            }
            catch (error) {
                console.log("Get item by id: ", error);
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
            if (searchParams.get('itemId')) {
                values = { ...values, itemId: Number(searchParams.get('itemId')) };
            }
            if (values.picture && values.picture.length > 0) {
                values = { ...values, base64: values.picture[0]?.thumbUrl };
            }

            const res = await actionItem(values as Item, searchParams.get('itemId') ? 'edit' : 'create');
            if (res && res.success) {
                toast(`${searchParams.get('itemId') ? 'Cập nhật' : 'Tạo mới'} thành công`, {
                    type: "success"
                });
                router.push("general");
            }
        }
        catch (error) {
            console.log("Action with item: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return <ItemForm
        fields={fields}
        onChange={(newFields) => {
            setFields(newFields);
        }}
        title={state}
        onFinish={onFinish}
        src={src}
        loading={loading}
    />
}

export default ItemAction;