import BASE_URL from "../../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../../helper/fetcher";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableData from "../../../component/admin/TableData";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import axios from "axios";
import ModalEditTenant from "../../../component/admin/ModalEditTenant";

const tenantColumns = [
    { id: 'number', label: '#', minWidth: 0 },
    { id: 'id', label: 'Id', minWidth: 0 },
    { id: 'full_name', label: 'Tenant Name' },
    { id: 'description', label: 'Description' },
    { id: 'location', label: 'Location' },
    { id: 'rating', label: 'Rating' },
    { id: 'total_order', label: 'Orders' },
    { id: 'total_menu', label: 'Menu' },
    { id: 'action', label: 'Action' },
]

const TenantPage = () => {
    const url = `${BASE_URL}/admin/tenant`;

    const { access_token } = useSelector(state => state.auth.accountData)
    const { data: allTenant, isLoading, error, mutate } = useSWR(url, (url) => fetcher(url, access_token));
    const [tenantData, setTenantData] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        if (allTenant) {
            const tempTenantData = allTenant.map((tenant, index) => ({
                number: index + 1,
                full_name: tenant?.full_name,
                id: tenant?._id,
                description: tenant?.description,
                rating: <Rating title={tenant?.rating} name="read-only" value={tenant?.rating} size="small" readOnly precision={0.1} />,
                total_order: tenant?.total_order,
                location: tenant?.location,
                total_menu: tenant?.total_menu,
                action: {
                    handleDetail: () => navigate(`/admin/tenant/${tenant?._id}`),
                    handleEdit: () => handleOpenModalEdit(tenant),
                    handleDelete: (id) => handleDelete(id)
                }
            }))
            setTenantData(tempTenantData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTenant])

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [selectedTenant, setSelectedTenant] = useState()
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
        setSelectedTenant(undefined)
    }
    const handleOpenModalEdit = (tenant) => {
        setOpenModalEdit(true)
        setSelectedTenant(tenant)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/admin/tenant/${id}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            mutate()
        } catch (err) {
            console.log(err)
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

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
            <ModalEditTenant
                open={openModalEdit}
                handleClose={handleCloseModalEdit}
                data={selectedTenant}
            />
        </div>
    );
}

export default TenantPage;

