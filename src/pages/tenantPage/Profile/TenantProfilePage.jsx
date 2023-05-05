import { Box, Button, CircularProgress, Container, IconButton, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../store/Auth";
import { Edit, Logout, Upload } from "@mui/icons-material";
import { useSelector } from "react-redux";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import Loading from "../../../component/state/Loading";
import ErrorApi from "../../../component/state/ErrorApi";
import fetcher from "../../../helper/fetcher";
import { useRef, useState } from "react";
import { ModalStyle } from "../../admin/Tenant/TenantDetailPage";
import axios from "axios";

const TenantProfilePage = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: profile, isLoading, isValidating, error, mutate } = useSWR(`${BASE_URL}/tenant/profile`, (url) => fetcher(url, access_token))
    const dispatch = useDispatch()

    const [openEditProfileImage, setOpenEditProfileImage] = useState(false)

    if (isLoading || isValidating) return <Loading />
    if (error) return <ErrorApi />

    const handleLogout = () => {
        dispatch(setLogout())
    }

    return (
        <>
            <Container sx={{ display: "grid", rowGap: 4 }}>
                <Box sx={{ display: "flex", columnGap: 2, justifyContent: "center" }}>
                    <Box
                        width={256}
                        height={256}
                        position={"relative"}
                    >
                        <IconButton onClick={() => setOpenEditProfileImage(true)} sx={{ position: "absolute", bottom: 2, right: -50 }}>
                            <Edit />
                        </IconButton>
                        <Box
                            component={"img"}
                            src={profile?.profile_image}
                            width={"100%"}
                            sx={{ objectFit: "cover", borderRadius: 2 }}
                        />
                    </Box>
                </Box>
                <Box sx={{ border: "4px solid rgba(0,0,0,0.2)", borderRadius: 3, p: 2.5, display: "grid", rowGap: 2 }}>
                    <Box>
                        <Typography variant="h6" fontWeight={600} fontSize={16} >Tenant Name</Typography>
                        <Typography variant="h5" fontSize={20}>{profile?.full_name}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={600} fontSize={16} >Email</Typography>
                        <Typography variant="h5" fontSize={20}>{profile?.email}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={600} fontSize={16} >Description</Typography>
                        <Typography variant="h5" fontSize={20}>{profile?.description}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={600} fontSize={16} >Location</Typography>
                        <Typography variant="h5" fontSize={20}>{profile?.location}</Typography>
                    </Box>
                </Box>
                <Typography variant="h4" sx={{ textAlign: "center" }}>Profile Page</Typography>
                <Button onClick={handleLogout} variant="contained" endIcon={<Logout />}>
                    Logout
                </Button>
            </Container>

            <ModalEditProfileImage open={openEditProfileImage} mutate={mutate} handleClose={() => { setOpenEditProfileImage(false) }} />
        </>
    );
}

export default TenantProfilePage;

const ModalEditProfileImage = ({ open, mutate, handleClose }) => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const imageFileRef = useRef()
    const [loading, setLoading] = useState(false)

    const [imagePreview, setImagePreview] = useState()
    const [newImage, setNewImage] = useState()

    const handleClickEditImage = () => {
        imageFileRef.current.click()
    }

    const handleChangeEditImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setNewImage(file)
                setImagePreview(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("profile_image", newImage)

            const response = await axios.put(`${BASE_URL}/tenant/profile-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (response?.status === 200) {
                mutate()
                onClose()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onClose = () => {
        setImagePreview(undefined)
        setNewImage(undefined)
        handleClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...ModalStyle, width: "300px" }}>
                {!imagePreview ? (
                    <Box
                        onClick={handleClickEditImage}
                        sx={{
                            width: "98%",
                            height: 300,
                            borderRadius: 2,
                            border: "4px dashed rgba(0,0,0,0.2)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                    >
                        <Box>

                            <Typography variant="h5" sx={{ textAlign: "center" }}>
                                <Upload sx={{ fontSize: 80, color: "gray" }} />
                                <br />
                                Upload your image
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{
                        width: "98%",
                        height: 300,
                        borderRadius: 2,
                        border: "4px dashed rgba(0,0,0,0.2)",
                    }} component={"img"} src={imagePreview}></Box>
                )}
                <input ref={imageFileRef} type="file" style={{ display: "none" }} onChange={handleChangeEditImage} />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Button fullWidth color="error" onClick={onClose} variant="contained" sx={{ mr: 2 }}>Cancel</Button>
                    <Button fullWidth disabled={!newImage || loading === true} onClick={handleSubmit} variant="contained">
                        {loading ? <CircularProgress size={16} /> : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
