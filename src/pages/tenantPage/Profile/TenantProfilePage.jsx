import { Box, Button, CircularProgress, Container, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../store/Auth";
import { Edit, Lock, Logout, Upload } from "@mui/icons-material";
import { useSelector } from "react-redux";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import Loading from "../../../component/state/Loading";
import ErrorApi from "../../../component/state/ErrorApi";
import fetcher from "../../../helper/fetcher";
import { useEffect, useRef, useState } from "react";
import { ModalStyle } from "../../admin/Tenant/TenantDetailPage";
import axios from "axios";
import { addNotification } from "../../../store/Notification";

const TenantProfilePage = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: profile, isLoading, isValidating, error, mutate } = useSWR(`${BASE_URL}/tenant/profile`, (url) => fetcher(url, access_token), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
    })
    const dispatch = useDispatch()

    const [openEditProfileImage, setOpenEditProfileImage] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [openChangePassword, setOpenChangePassword] = useState(false)

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
                <Box sx={{ border: "4px solid rgba(0,0,0,0.2)", borderRadius: 3, p: 2.5, display: "grid", rowGap: 2, position: "relative" }}>
                    <IconButton onClick={() => setOpenEditProfile(true)} sx={{ position: "absolute", top: 2, right: 2 }}>
                        <Edit />
                    </IconButton>
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
                <Button onClick={() => setOpenChangePassword(true)} variant="contained" color="warning" endIcon={<Lock />}>
                    Change Password
                </Button>
                <Button onClick={handleLogout} variant="contained" endIcon={<Logout />}>
                    Logout
                </Button>
            </Container>

            {openEditProfileImage && <ModalEditProfileImage
                open={openEditProfileImage}
                mutate={mutate}
                handleClose={() => { setOpenEditProfileImage(false) }}
            />}
            {openEditProfile && <ModalEditProfile
                open={openEditProfile}
                mutate={mutate}
                handleClose={() => { setOpenEditProfile(false) }}
                profile={profile}
            />}
            {openChangePassword && <ModalChangePassword
                open={openChangePassword}
                handleClose={() => { setOpenChangePassword(false) }}
            />}
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
    const dispatch = useDispatch()

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
                dispatch(addNotification({ message: "Success edit profile image", type: "success" }))
                mutate()
                onClose()
            }
        } catch (error) {
            console.log(error)
            dispatch(addNotification({ message: "Failed to edit profile image", type: "error" }))
        } finally {
            setLoading(false)
        }
    }

    const onClose = () => {
        handleClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...ModalStyle, width: { xs: "280px", sm: "400px" } }}>
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
                        objectFit: "contain"
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

const ModalEditProfile = ({ open, mutate, handleClose, profile }) => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        full_name: profile?.full_name,
        location: profile?.location,
        email: profile?.email,
        description: profile?.description
    })

    const [formError, setFormError] = useState()

    const handleChangeForm = (e) => {
        setFormError(undefined)
        setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.put(`${BASE_URL}/tenant/profile`, form, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response?.status === 200) {
                dispatch(addNotification({ message: "Success edit profile", type: "success" }))
                mutate()
                onClose()
            }
        } catch (error) {
            setFormError(error?.response?.data?.error)
            dispatch(addNotification({ message: "Failed to edit profile", type: "error" }))
        } finally {
            setLoading(false)
        }
    }

    const onClose = () => {
        handleClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...ModalStyle, width: { xs: "280px", sm: "400px" } }}>
                <Box sx={{ display: "grid", rowGap: 2 }}>
                    <TextField
                        fullWidth
                        type="text"
                        label="Full Name"
                        variant="outlined"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChangeForm}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        label="Location"
                        variant="outlined"
                        name="location"
                        value={form.location}
                        onChange={handleChangeForm}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="text"
                        variant="outlined"
                        name="email"
                        value={form.email}
                        onChange={handleChangeForm}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={form.description}
                        onChange={handleChangeForm}
                        multiline={true}
                        minRows={4}
                    />
                </Box>
                {formError && <Typography color="red">{formError}</Typography>}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Button fullWidth color="error" onClick={onClose} variant="contained" sx={{ mr: 2 }}>Cancel</Button>
                    <Button fullWidth disabled={loading === true} onClick={handleSubmit} variant="contained">
                        {loading ? <CircularProgress size={16} /> : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

const ModalChangePassword = ({ open, handleClose }) => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState()
    const [isFormValid, setIsFormValid] = useState(false)
    const [form, setForm] = useState({
        password: "",
        new_password: "",
        confirm_new_password: ""
    })

    const dispatch = useDispatch()

    const handleChangeForm = (e) => {
        setFormError(undefined)
        setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (form.password.length >= 6 && form.new_password.length >= 6 && form.confirm_new_password.length >= 6) {
            if (form.new_password !== form.confirm_new_password) {
                setIsFormValid(false)
            } else {
                setIsFormValid(true)
            }
        } else {
            setIsFormValid(false)
        }
    }, [form])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.put(`${BASE_URL}/tenant/change-password`, form, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response?.status === 200) {
                dispatch(addNotification({ message: "Change password success", type: "success" }))
                handleClose()
            }
        } catch (error) {
            dispatch(addNotification({ message: "Change password error", type: "error" }))
            setFormError(error?.response?.data?.error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>

            <Box sx={{ ...ModalStyle, width: { xs: "280px", sm: "400px" } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "grid", rowGap: 2 }}>
                        <TextField
                            fullWidth
                            required
                            label="Password"
                            variant="outlined"
                            name="password"
                            value={form.password}
                            onChange={handleChangeForm}
                            type="password"
                        />
                        <TextField
                            fullWidth
                            required
                            label="New Password"
                            variant="outlined"
                            name="new_password"
                            value={form.new_password}
                            onChange={handleChangeForm}
                            type="password"
                        />
                        <TextField
                            fullWidth
                            required
                            label="Confirm New Password"
                            variant="outlined"
                            name="confirm_new_password"
                            value={form.confirm_new_password}
                            onChange={handleChangeForm}
                            type="password"
                        />
                    </Box>
                    {formError && <Typography color="red">{formError}</Typography>}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Button fullWidth color="error" onClick={handleClose} variant="contained" sx={{ mr: 2 }}>Cancel</Button>
                        <Button fullWidth disabled={loading === true || !isFormValid} type="submit" variant="contained">
                            {loading ? <CircularProgress size={16} /> : "Submit"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}