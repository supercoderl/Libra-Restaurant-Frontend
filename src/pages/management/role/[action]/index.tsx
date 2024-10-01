
import { actionRole, role } from "@/api/business/roleApi";
import { RoleForm } from "@/forms/role";
import { Role } from "@/type/Role";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RoleAction: NextPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['roleId'], value: "0" },
        { name: ['name'], value: '' },
        { name: ['description'], value: '' },
    ]);
    const [src, setSrc] = useState("");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("Thêm mới vai trò");

    const onLoad = async () => {
        if (searchParams.get('roleId')) {
            try {
                const res = await role(Number(searchParams.get('roleId')));
                if (res && res.success) {
                    setFields([
                        { name: 'roleId', value: res.data?.roleId },
                        { name: 'name', value: res.data?.name },
                        { name: 'description', value: res.data?.description || '' }
                    ]);
                    setSrc(res.data?.picture || "")
                    setState("Cập nhật vai trò");
                }
            }
            catch (error) {
                console.log("Get role by id: ", error);
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
            const res = await actionRole(values as Role, searchParams.get('roleId') ? 'edit' : 'create');
            if (res && res.success) {
                toast(`${searchParams.get('roleId') ? 'Cập nhật' : 'Tạo mới'} thành công`, {
                    type: "success"
                });
                router.push("general");
            }
        }
        catch (error) {
            console.log("Action with role: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return <RoleForm
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

export default RoleAction;