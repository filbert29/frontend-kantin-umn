import { Box, Modal, Typography } from "@mui/material";
import TableData from "../../../component/admin/TableData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import { ModalStyle } from "../Tenant/TenantDetailPage";
import DefaultImage from "../../../assets/default.jpg";
import axios from "axios";
import ModalEditMenu from "../../../component/admin/ModalEditMenu";

const menuColumns = [
    { id: 'number', label: '#' },
    { id: 'id', label: 'Id' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'price', label: 'Price', sort: true },
    { id: 'category', label: 'Category' },
    { id: 'tenant', label: 'Tenant' },
    { id: 'prep_duration', label: 'Prep Duration' },
    { id: 'action', label: '' }
]

const MenuPage = () => {
    const { access_token } = useSelector((state) => state.auth?.accountData)
    const { data: allMenu, error, isLoading, mutate } = useSWR(`${BASE_URL}/admin/menu`, (url) => fetcher(url, access_token));
    const [menu, setMenu] = useState()

    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)

    const [selectedMenuDetail, setSelectedMenuDetail] = useState()

    useEffect(() => {
        if (allMenu) {
            const tempMenu = allMenu?.map((menu, index) => ({
                number: index + 1,
                id: menu?._id,
                tenant: menu?.tenant?.full_name,
                title: menu?.title,
                description: menu?.description,
                category: menu?.category?.title || "-",
                price: "Rp" + (menu?.price).toLocaleString("id-ID"),
                prep_duration: menu?.prep_duration,
                action: {
                    handleDetail: () => handleOpenModalDetail(menu),
                    handleEdit: () => handleOpenModalEdit(menu),
                    handleDelete: (id) => handleDelete(id)
                }
            }))
            setMenu(tempMenu)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allMenu])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/admin/menu/${id}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            mutate()
        } catch (err) {
            console.log(err)
        }
    }

    const handleOpenModalDetail = (menu) => {
        setSelectedMenuDetail(menu)
        setOpenModalDetail(true)
    }

    const handleOpenModalEdit = (menu) => {
        setSelectedMenuDetail(menu)
        setOpenModalEdit(true)
    }

    const handleCloseModalDetail = () => {
        setOpenModalDetail(false)
        setSelectedMenuDetail(undefined)
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
        setSelectedMenuDetail(undefined)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    return (
        <>
            <Box>
                <TableData
                    title={"Orders"}
                    columns={menuColumns}
                    data={menu}
                    searchField={[
                        { id: 'tenant', label: 'Tenant Name' },
                        { id: 'customer', label: 'Customer Name' },
                        { id: 'id', label: 'Order Id' },
                    ]}
                />
            </Box>

            <ModalMenuDetail
                open={openModalDetail}
                handleClose={handleCloseModalDetail}
                menu={selectedMenuDetail}
            />

            <ModalEditMenu
                open={openModalEdit}
                handleClose={handleCloseModalEdit}
                menu={selectedMenuDetail}
            />
        </>
    );
}

export default MenuPage;

const ModalMenuDetail = ({ open, handleClose, menu }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={ModalStyle}>
                <img width={"100%"} height={"400px"} style={{ objectFit: "cover" }} alt={menu?.title} src={menu?.image || DefaultImage}></img>
                <Typography mt={1} variant="h5" component="h1">
                    {menu?.title}
                </Typography>
                <Typography variant="p" component="p">
                    {menu?.category?.title || "No Category"}
                </Typography>
                <Typography my={1} variant="p" component="p">
                    {menu?.price}
                </Typography>
                <Typography variant="p" component="p">
                    {menu?.description}
                </Typography>
            </Box>
        </Modal>
    );
}



