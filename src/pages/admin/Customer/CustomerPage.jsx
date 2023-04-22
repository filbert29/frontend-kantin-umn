import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr"
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import { Button} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import TableData from "../../../component/admin/TableData";

const customerColumn = [
    { id: 'number', label: '#', minWidth: 0 },
    { id: 'full_name', label: 'Customer Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'total_order', label: 'Total Orders', minWidth: 170 },
    { id: 'action', label: '', minWidth: 170 },

]

const CustomerPage = () => {
    const url = `${BASE_URL}/admin/customer`;

    const { access_token } = useSelector(state => state.auth.accountData)
    const { data: allTenant, error } = useSWR(url, (url) => fetcher(url, access_token));
    const [tenantData, setTenantData] = useState()


    const navigate = useNavigate()

    useEffect(() => {
        if (allTenant) {
            const tempCustomerData = allTenant.map((customer, index) => ({
                number: index + 1,
                full_name: customer?.full_name,
                email: customer?.email,
                total_order: customer?.total_order,
                action: (
                    <Button startIcon={<Visibility />} onClick={() => navigate(`/admin/customer/${customer?._id}`)}>Detail</Button>
                )
            }))
            setTenantData(tempCustomerData)
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
                columns={customerColumn}
            />
        </div>
    );
}

export default CustomerPage;