
import { categories } from "@/api/business/categoryApi";
import { roles } from "@/api/business/roleApi";
import { CategoryContainer } from "@/containers/dashboard-container/categories";
import { RoleContainer } from "@/containers/dashboard-container/roles";
import { ListRep } from "@/type/objectTypes";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Role: NextPage = () => {

    const [result, setResult] = useState<ListRep | null | undefined>(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(1);
    const [size, setSize] = useState(10);
    const [searchText, setSearchText] = useState<string | null>(null);

    const onLoad = async () => {
        setLoading(true);
        try {
            const res = await roles({ page: index, pageSize: size, searchTerm: searchText });
            if (res && res.success) {
                setResult(res.data);
            }
        }
        catch (error) {
            console.log("OnLoad Role: ", error);
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    }

    useEffect(() => { onLoad() }, [index, size, searchText]);

    return <RoleContainer
        result={result}
        loading={loading}
        onReload={onLoad}
        onPaginationChange={(index, size) => {
            setIndex(index);
            setSize(size);
        }}
        onSearch={(text) => {
            if(text === "") setSearchText(null);
            else setSearchText(text);
        }}
    />
}

export default Role;