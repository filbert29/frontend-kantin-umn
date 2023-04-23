import BASE_URL from "../../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../../helper/fetcher";
import { Button } from "@mui/material";
import { Visibility } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableData from "../../../component/admin/TableData";
import { useEffect, useState } from "react";

const tenantColumns = [
    { id: 'number', label: '#', minWidth: 0 },
    { id: 'id', label: 'Id', minWidth: 0 },
    { id: 'full_name', label: 'Tenant Name' },
    { id: 'rating', label: 'Rating' },
    { id: 'total_order', label: 'Orders' },
    { id: 'total_menu', label: 'Menu' },
    { id: 'action', label: 'Action' },
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
                id: tenant?._id,
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
                title={"Tenants"}
                data={tenantData}
                columns={tenantColumns}
                searchField={[
                    { id: 'full_name', label: 'Tenant Name' },
                    { id: 'id', label: 'Tenant Id' },
                ]}
            />
        </div>
    );
}

export default TenantPage;