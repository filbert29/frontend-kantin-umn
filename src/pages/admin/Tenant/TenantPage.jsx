import BASE_URL from "../../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../../helper/fetcher";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableData from "../../../component/admin/TableData";
import { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Modal, Rating, TextField, Typography } from "@mui/material";
import { ModalStyle } from "./TenantDetailPage";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import DefaultImage from "./../../../assets/default.jpg"

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
    const { data: allTenant, isLoading, error } = useSWR(url, (url) => fetcher(url, access_token));
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
                    handleDetail: (id) => navigate(`/admin/tenant/${id}`),
                    handleEdit: (id) => handleOpenModalEdit(id),
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
    const handleOpenModalEdit = (id) => {
        setOpenModalEdit(true)
        setSelectedTenant(allTenant?.filter(tenant => tenant?._id === id)[0])
    }

    if (isLoading) return (
        <p>Loading...</p>
    )

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
            <ModalEdit
                open={openModalEdit}
                handleClose={handleCloseModalEdit}
                data={selectedTenant}
            />
        </div>
    );
}

export default TenantPage;

const ModalEdit = ({ open, handleClose, data = undefined }) => {
    const [form, setForm] = useState()
    const [profileImage, setProfileImage] = useState()
    const [previewProfileImage, setPreviewProfileImage] = useState()

    const imageFileRef = useRef()
    const { access_token } = useSelector(state => state.auth.accountData)

    useEffect(() => {
        if (data) {
            setForm({
                full_name: data?.full_name,
                description: data?.description,
                email: data?.email,
                location: data?.location,
            })
        } else {
            setForm(undefined)
            setProfileImage(undefined)
            setPreviewProfileImage(undefined)
        }
    }, [data])

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
            formData.append("full_name", form?.full_name)
            formData.append("description", form?.description)
            formData.append("location", form?.location)
            formData.append("email", form?.email)
            
            if (profileImage) {
                formData.append("profile_image", profileImage)
            }

            const response = await axios.put(`${BASE_URL}/admin/tenant/${data?._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (response.status === 200) {
                alert("Tenant updated successfully")
                handleClose()
            }

        } catch (err) {
            console.log(err)
        } finally {
            handleClose()
        }

    }

    const handleChangeEditImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setProfileImage(file)
                setPreviewProfileImage(e.target.result)
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
                <Box component={"form"} sx={{display: "flex", flexDirection: "column", rowGap: 2}} onSubmit={handleSubmit}>
                    <Box >
                        <img src={previewProfileImage || data?.profile_image || DefaultImage} alt={data?.full_name} style={{ objectFit: "cover" }} width="80%" height="300px" />
                        <IconButton onClick={handleClickEditImage} sx={{ ml: 4 }} >
                            <Edit />
                        </IconButton>
                        <input ref={imageFileRef} type="file" style={{ display: "none" }} onChange={handleChangeEditImage} />
                    </Box>
                    <TextField
                        variant="standard"
                        name="full_name"
                        label="Full Name"
                        placeholder="Enter Tenant Name"
                        value={form?.full_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        name="email"
                        label="Email"
                        placeholder="Enter Tenant Name"
                        value={form?.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        name="location"
                        label="Location"
                        placeholder="Enter tenant location"
                        value={form?.location}
                        onChange={handleChange}
                        fullWidth
                        multiline
                    />
                    <TextField
                        variant="standard"
                        name="description"
                        label="Description"
                        placeholder="Enter tenant description"
                        value={form?.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
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