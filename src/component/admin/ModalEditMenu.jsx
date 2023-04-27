import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import BASE_URL from "../../config/BASE_URL"
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material"
import { Edit } from "@mui/icons-material"
import { ModalStyle } from "../../pages/admin/Tenant/TenantDetailPage"
import DefaultImage from "../../assets/default.jpg"


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
        } else {
            setForm(undefined)
            setMenuImage(undefined)
            setPreviewMenuImage(undefined)
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
                        value={form?.description}
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
                        label="Tenant Name"
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

export default ModalEditMenu