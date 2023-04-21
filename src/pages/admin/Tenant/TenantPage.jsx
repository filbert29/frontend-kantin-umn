import BASE_URL from "../../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../../helper/fetcher";
import { Button } from "@mui/material";
import { Visibility } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableData from "../../../component/Admin/TableData";
import { useEffect, useState } from "react";

const tenantColumns = [
    { id: 'number', label: '#', minWidth: 0 },
    { id: 'full_name', label: 'Tenant Name', minWidth: 170 },
    { id: 'rating', label: 'Rating', minWidth: 170 },
    { id: 'total_order', label: 'Orders', minWidth: 170 },
    { id: 'total_menu', label: 'Menu', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
]

const TenantPage = () => {
    const url = `${BASE_URL}/admin/tenant`;

    const { accountData } = useSelector(state => state.auth)
    const { data: allTenant, error } = useSWR(url, (url) => fetcher(url, accountData?.access_token));
    const [tenantData, setTenantData] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        if (allTenant) {
            const tempTenantData = allTenant.map((tenant, index) => ({
                number: index + 1,
                full_name: tenant?.full_name,
                rating: tenant?.rating,
                total_order: tenant?.total_order,
                total_menu: tenant?.total_menu,
                action: (
                    <Button onClick={() => navigate(`/admin/tenant/${tenant?._id}`)} endIcon={<Visibility />}>
                        See Detail
                    </Button>
                )
            }))
            setTenantData(tempTenantData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTenant])

    if (error) return (
        <p>Something went wrong</p>
    )

    return (
        <div>
            <TableData
                data={tenantData}
                columns={tenantColumns}
            />
        </div>
    );
}

export default TenantPage;