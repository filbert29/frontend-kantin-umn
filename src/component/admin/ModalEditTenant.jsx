import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { ModalStyle } from "../../pages/admin/Tenant/TenantDetailPage"
import { Edit } from "@mui/icons-material"
import BASE_URL from "../../config/BASE_URL"
import axios from "axios"
import DefaultImage from "../../assets/default.jpg"

const ModalEditTenant = ({ open, handleClose, data = undefined }) => {
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

export default ModalEditTenant