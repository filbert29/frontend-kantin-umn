import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr"
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import TableData from "../../../component/admin/TableData";

const customerColumn = [
    { id: 'number', label: '#', minWidth: 0 },
    { id: 'id', label: 'Id' },
    { id: 'full_name', label: 'Customer Name' },
    { id: 'email', label: 'Email' },
    { id: 'total_order', label: 'Total Orders' },
    { id: 'action', label: '' },

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
                id: customer?._id,
                email: customer?.email,
                total_order: customer?.total_order,
                action: {
                    handleDetail: (id) => navigate(`/admin/customer/${id}`)
                }
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
                title={"Customers"}
                data={tenantData}
                columns={customerColumn}
                searchField={[
                    { id: 'full_name', label: 'Customer Name' },
                    { id: 'id', label: 'Customer Id' },
                    { id: 'email', label: 'Email' },
                ]}
            />
        </div>
    );
}

export default CustomerPage;