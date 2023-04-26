import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import TableData from "../../../component/admin/TableData";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import { ModalStyle } from "../Tenant/TenantDetailPage";
import DefaultImage from "../../../assets/default.jpg";
import axios from "axios";
import { Edit } from "@mui/icons-material";

const menuColumns = [
    { id: 'number', label: '#' },
    { id: 'id', label: 'Id' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'price', label: 'Price', sort: true },
    { id: 'category', label: 'Category' },
    { id: 'tenant', label: 'Tenant' },
    { id: 'action', label: '' }
]

const MenuPage = () => {
    const { access_token } = useSelector((state) => state.auth?.accountData)
    const { data: allMenu, error, isLoading } = useSWR(`${BASE_URL}/admin/menu`, (url) => fetcher(url, access_token));

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
                action: {
                    handleDetail: () => {
                        setSelectedMenuDetail(menu)
                        setOpenModalDetail(true)
                    },
                    handleEdit: () => {
                        setSelectedMenuDetail(menu)
                        setOpenModalEdit(true)
                    }
                }
            }))
            setMenu(tempMenu)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allMenu])

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
                handleClose={() => {
                    setOpenModalDetail(false)
                    setSelectedMenuDetail(undefined)
                }}
                menu={selectedMenuDetail}
            />

            <ModalEditMenu
                open={openModalEdit}
                handleClose={() => {
                    setOpenModalEdit(false)
                    setSelectedMenuDetail(undefined)
                }}
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

const ModalEditMenu = ({ open, handleClose, menu }) => {
    const [form, setForm] = useState()
    const [menuImage, setMenuImage] = useState()
    const [previewMenuImage, setPreviewMenuImage] = useState()

    const imageFileRef = useRef()
    const { access_token } = useSelector(state => state.auth.accountData)

    useEffect(() => {
        if (menu) {
            setForm({
                title: menu?.title,
                description: menu?.description,
                price: menu?.price,
                category: menu?.category?._id,
                tenant: menu?.tenant?.full_name,
                image: menu?.image
            })
            setPreviewMenuImage(menu?.image)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("title", form?.title)
            formData.append("description", form?.description)
            formData.append("price", form?.price)

            if (menuImage) {
                formData.append("image", menuImage)
            }

            const response = await axios.put(`${BASE_URL}/admin/menu/${menu?._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (response?.status === 200) {
                alert("Success edit menu")
            }
        } catch (error) {
            console.log(error)
        } finally {
            handleClose()
        }
    }

    const handleChangeEditImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setMenuImage(file)
                setPreviewMenuImage(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleClickEditImage = () => {
        imageFileRef.current.click()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={ModalStyle}>
                <Typography textAlign={"center"} variant="h5" mb={2} >Edit Tenant</Typography>
                <Box component={"form"} sx={{ display: "flex", flexDirection: "column", rowGap: 2 }} onSubmit={handleSubmit}>
                    <Box >
                        <img src={previewMenuImage || menu?.image || DefaultImage} alt={menu?.full_name} style={{ objectFit: "cover" }} width="80%" height="300px" />
                        <IconButton onClick={handleClickEditImage} sx={{ ml: 4 }} >
                            <Edit />
                        </IconButton>
                        <input ref={imageFileRef} type="file" style={{ display: "none" }} onChange={handleChangeEditImage} />
                    </Box>
                    <TextField
                        variant="standard"
                        name="title"
                        label="Menu Title"
                        placeholder="Enter Menu Tile"
                        value={form?.title}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        name="description"
                        label="Menu Description"
                        placeholder="Enter Menu Description"
                        value={form?.title}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        name="price"
                        label="Price"
                        placeholder="Enter Price"
                        value={form?.price}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        name="tenant"
                        tenant="Tenant Name"
                        value={form?.tenant}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={2} >
                        <Button variant="contained" color="error" onClick={handleClose} sx={{ mr: 1 }} >Cancel</Button>
                        <Button variant="contained" color="success" type="submit" >Save</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

