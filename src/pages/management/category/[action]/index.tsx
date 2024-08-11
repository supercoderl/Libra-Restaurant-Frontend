
import { actionCategory, category } from "@/api/business/categoryApi";
import { CategoryForm } from "@/forms/category";
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
        { name: ['isActive'], value: true }
    ]);
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
                        { name: 'isActive', value: res.data?.isActive }
                    ]);
                    setState("Cập nhật danh mục");
                }
            }
            catch (error) {
                console.log("Get category by id: ", error);
            }
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (searchParams.get('categoryId')) {
                values = { ...values, categoryId: Number(searchParams.get('categoryId')) };
            }

            const res = await actionCategory(values, searchParams.get('categoryId') ? 'edit' : 'create');
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
        onFinish={onFinish}
        loading={loading}
    />
}

export default CategoryAction;