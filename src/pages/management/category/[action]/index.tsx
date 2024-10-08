
import { actionCategory, category } from "@/api/business/categoryApi";
import { CategoryForm } from "@/forms/category";
import Category from "@/type/Category";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const CategoryAction: NextPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['name'], value: '' },
        { name: ['description'], value: '' },
        { name: ['isActive'], value: true },
        { name: ['picture'], value: null },
        { name: ['base64'], value: null },
    ]);
    const [src, setSrc] = useState("");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("Thêm mới danh mục");

    const onLoad = async () => {
        if (searchParams.get('categoryId')) {
            try {
                const res = await category(Number(searchParams.get('categoryId')));
                if (res && res.success) {
                    setFields([
                        { name: 'name', value: res.data?.name },
                        { name: 'description', value: res.data?.description || '' },
                        { name: 'isActive', value: res.data?.isActive },
                        { name: 'picture', value: res.data?.picture }
                    ]);
                    setSrc(res.data?.picture || "")
                    setState("Cập nhật danh mục");
                }
            }
            catch (error) {
                console.log("Get category by id: ", error);
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
            if (searchParams.get('categoryId')) {
                values = { ...values, categoryId: Number(searchParams.get('categoryId')) };
            }

            if (values.base64 && values.base64.length > 0) {
                values = { ...values, base64: Array.isArray(values.base64) ? values.base64[0]?.thumbUrl : null };
            }

            const res = await actionCategory(values as Category, searchParams.get('categoryId') ? 'edit' : 'create');
            if (res && res.success) {
                toast(`${searchParams.get('categoryId') ? 'Cập nhật' : 'Tạo mới'} thành công`, {
                    type: "success"
                });
                router.push("general");
            }
        }
        catch (error) {
            console.log("Action with category: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return <CategoryForm
        fields={fields}
        onChange={(newFields) => {
            setFields(newFields);
        }}
        title={state}
        src={src}
        onFinish={onFinish}
        loading={loading}
    />
}

export default CategoryAction;