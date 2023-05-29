import { Box, Button, Chip, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField, Typography } from "@mui/material";
import Header from "../../component/Header";
import ProfilePicture from "../../assets/profile-picture.png"
import { useRef, useState } from "react";
import IconEdit from "../../assets/icon-edit.png"
import IconPlus from "../../assets/icon-plus.png"
import IconLogout from "../../assets/icon-logout.png"
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../../store/Auth";
import axios from "axios";
import BASE_URL from "../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher";
import "../../assets/style/styleProfile.css"
import { Upload } from "@mui/icons-material";
import { addNotification } from "../../store/Notification";


const MyAccount = () => {
    const title = "My Account"

    const [change_email, setChangeEmail] = useState('')
    const [change_full_name, setChangeFullName] = useState('')

    const [errorMessage, setErrorMessage] = useState('');

    const [openname, setOpenName] = useState(false);
    const [openemail, setOpenEmail] = useState(false);
    const [openpassword, setOpenPassword] = useState(false);
    const [openPP, setOpenPP] = useState(false);

    const { accountData } = useSelector((state) => state.auth)

    const [password, setPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [confirm_new_password, setConfirmPassword] = useState('')

    const [openbalance, setOpenBalance] = useState(false);
    const [amount, setAmount] = useState()

    const [imagePreview, setImagePreview] = useState()
    const [newImage, setNewImage] = useState()
    const [loading, setLoading] = useState(false)
    const imageFileRef = useRef()

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

    const handleClickOpenName = () => {
        setOpenName(true);
    };

    const handleClickOpenBalance = () => {
        setOpenBalance(true);
    };

    const handleClickOpenEmail = () => {
        setOpenEmail(true);
    };

    const handleClickOpenPassword = () => {
        setOpenPassword(true);
    };

    const handleClose = () => {
        setOpenBalance(false)
        setOpenName(false);
        setOpenEmail(false);
        setOpenPassword(false);
        setOpenPP(false)
    };

    const dispatch = useDispatch()

    const url = `${BASE_URL}/customer/profile`

    const { data: customer, isLoading, error, mutate } = useSWR(url, (url) => fetcher(url, accountData?.access_token))

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handleEditName = async (e) => {
        e.preventDefault();

        const email = customer?.email;
        const full_name = change_full_name;

        try {
            const change_name = { full_name, email };
            const response = await axios.put(BASE_URL + "/customer/profile", change_name, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            const access_token = accountData.access_token;
            const profile_image = accountData.profile_image;
            const role = accountData.role;
            const data = { access_token, email, full_name, profile_image, role }
            dispatch(setLogin(data))
            // console.log(response)
            mutate()
            setOpenName(false);
        } catch (err) {
            setErrorMessage('*' + err.response.data.message);
            setChangeFullName("")
        }
    }

    const handleEditEmail = async (e) => {
        e.preventDefault();

        const email = change_email;
        const full_name = customer?.full_name;

        try {
            const change_email = { full_name, email };
            const response = await axios.put(BASE_URL + "/customer/profile", change_email, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            const access_token = accountData.access_token;
            const profile_image = customer.profile_image;
            const role = accountData.role;
            const data = { access_token, email, full_name, profile_image, role }
            dispatch(setLogin(data))
            // console.log(response)
            mutate()
            setOpenEmail(false);
        } catch (err) {
            setErrorMessage('*' + err.response.data.message);
            setChangeEmail("")
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            const change_password = { password, new_password, confirm_new_password };
            const response = await axios.put(BASE_URL + "/customer/change-password", change_password, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            setPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setOpenPassword(false);
        } catch (err) {
            console.log(err)
            setErrorMessage('*' + err.response.data.message);
            setPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }

    const handleChangeBalance = async (e) => {
        e.preventDefault();

        try {
            const balance = { amount }
            const response = await axios.patch(BASE_URL + "/customer/balance", balance, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            setAmount(0)
            mutate()
            setOpenBalance(false);
        } catch (err) {
            console.log(err)
            setErrorMessage('*' + err.response.data.message);
            setAmount(0)
        }
    }

    const handleSubmitPP = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("profile_image", newImage)

            const response = await axios.put(`${BASE_URL}/customer/profile-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${accountData?.access_token}`
                }
            })

            if (response?.status === 200) {
                dispatch(addNotification({ message: "Berhasil ubah foto profil", type: "success" }))
                mutate()
                handleClose()
            }
        } catch (error) {
            console.log(error)
            dispatch(addNotification({ message: "Gagal mengubah foto profil", type: "error" }))
        } finally {
            setLoading(false)
        }
    }

    const ModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };

    console.log(customer)

    return (
        <Container
            sx={{
                maxWidth: { md: "md", sm: "md" }
            }}>
            <Box
                className="my-account"
                sx={{
                    backgroundColor: "#fffffe",
                    boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                    minHeight: "97.5vh",
                    padding: { md: "20px 20px", xs: "20px 0px" },
                    color: "#5F6C7B"
                }}>
                <Header title={title} />
                <Box className="main"
                    sx={{
                        paddingLeft: { md: "40px", xs: "20px" },
                        display: "flex",
                        alignItems: "center",
                        gap: "20px"
                    }}>
                    <Box className="profile-picture" sx={{cursor: "pointer"}}>
                        <Box onClick={() => setOpenPP(true)}>
                            <img style={{borderRadius: "15px"}} src={customer.profile_image || ProfilePicture} alt="" width={"160px"} borderRadius={"15px"} />
                        </Box>
                    </Box>
                    <Box className="name-tag" display={"grid"} gap={"10px"}>
                        <Typography variant="p" sx={{ fontSize: { md: "24px", xs: "20px" }, fontWeight: "bold" }}>{customer.full_name}</Typography>
                        <Chip label="Customer" sx={{ fontWeight: "bold", backgroundColor: "#094067", color: "white", width: "100px", paddingY: "17px" }} />
                    </Box>
                    <Modal open={openPP} onClose={handleClose}>
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
                                            Unggah foto profil
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
                                <Button fullWidth color="error" onClick={handleClose} variant="contained" sx={{ mr: 2 }}>Batal</Button>
                                <Button fullWidth disabled={!newImage || loading === true} onClick={handleSubmitPP} variant="contained">
                                    {loading ? <CircularProgress size={16} /> : "Submit"}
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                <Box className="data diri shadow-box"
                    sx={{
                        padding: { md: "40px", xs: "20px" },
                        borderRadius: "18px",
                        display: "grid",
                        gap: "40px",
                        margin: { md: "30px", xs: "30px 0px" }
                    }}>
                    <Box className="name" sx={{
                        gap: "10px",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography variant="p" sx={{ fontSize: { md: "18px", xs: "14px" } }}>Display Name</Typography>
                        <Box >
                            <Typography variant="p" sx={{ fontSize: { md: "24px", xs: "16px" } }}>{customer.full_name}</Typography>
                            <Button
                                onClick={handleClickOpenName}
                                sx={{
                                    minWidth: "0",
                                    float: "right",
                                    backgroundColor: { md: "#D8EEFE", xs: "white" },
                                    padding: "0",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: { md: "#86c7f7", xs: "white" } }
                                }}> <Typography variant="span" sx={{ margin: "8px 20px", fontWeight: "bold", display: { md: "block", xs: "none" } }}>Edit</Typography> <img src={IconEdit} alt="" /></Button>
                        </Box>
                        <Dialog open={openname} onClose={handleClose}>
                            <DialogTitle>Edit Name</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    onChange={(e) => setChangeFullName(e.target.value)}
                                    value={change_full_name}
                                    margin="dense"
                                    id="change_name"
                                    label="Change Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleEditName}>Edit</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Box className="email" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" sx={{ fontSize: { md: "18px", xs: "14px" } }}>Email</Typography>
                        <Box>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { md: "24px", xs: "16px" }
                                }}>{accountData.email}
                            </Typography>
                            <Button
                                onClick={handleClickOpenEmail}
                                sx={{
                                    minWidth: "0",
                                    float: "right",
                                    backgroundColor: { md: "#D8EEFE", xs: "white" },
                                    padding: "0",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: { md: "#86c7f7", xs: "white" } }
                                }}> <Typography variant="span" sx={{ margin: "8px 20px", fontWeight: "bold", display: { md: "block", xs: "none" } }}>Edit</Typography> <img src={IconEdit} alt="" /></Button>
                        </Box>
                        <Dialog open={openemail} onClose={handleClose}>
                            <DialogTitle>Edit Email</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    onChange={(e) => setChangeEmail(e.target.value)}
                                    value={change_email}
                                    margin="dense"
                                    id="change_email"
                                    label="Change Email"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleEditEmail}>Edit</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Box className="password" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" sx={{ fontSize: { md: "18px", xs: "14px" } }}>Password</Typography>
                        <Box>
                            <Typography variant="p" sx={{ fontSize: { md: "24px", xs: "18px" } }}>********</Typography>
                            <Button
                                onClick={handleClickOpenPassword}
                                sx={{
                                    minWidth: "0",
                                    float: "right",
                                    backgroundColor: { md: "#D8EEFE", xs: "white" },
                                    padding: "0",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: { md: "#86c7f7", xs: "white" } }
                                }}> <Typography variant="span" sx={{ margin: "8px 20px", fontWeight: "bold", display: { md: "block", xs: "none" } }}>Change Password</Typography> <img src={IconEdit} alt="" /></Button>
                        </Box>
                    </Box>
                    <Dialog open={openpassword} onClose={handleClose}>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                margin="dense"
                                id="password"
                                label="Password"
                                type=""
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={new_password}
                                margin="dense"
                                id="new-password"
                                label="New Password"
                                type=""
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirm_new_password}
                                margin="dense"
                                id="confirm-password"
                                label="Confirm Password"
                                type=""
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleChangePassword}>Edit</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                <Box className="balance shadow-box"
                    sx={{
                        padding: { md: "40px", xs: "20px" },
                        borderRadius: "18px",
                        display: "grid",
                        gap: "40px",
                        margin: { md: "30px", xs: "30px 0px" }
                    }}>
                    <Box className="balance" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" sx={{ fontSize: { md: "18px", xs: "14px" } }}>Balance</Typography>
                        <Box>
                            <Typography variant="p" sx={{ fontSize: { md: "24px", xs: "18px" } }}>Rp. <Typography variant="span" sx={{ fontSize: { md: "48px", xs: "28px" } }}>{customer.balance.toLocaleString("id-ID")}</Typography></Typography>
                            <Button
                                onClick={handleClickOpenBalance}
                                sx={{
                                    minWidth: "0",
                                    float: "right",
                                    backgroundColor: "#3DA9FC",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: "#0090ff" }
                                }}> <img src={IconPlus} alt="" width={"40px"} /> <Typography variant="span" sx={{ margin: "8px 20px", fontWeight: "bold", display: { md: "block", xs: "none" } }}>Top up</Typography></Button>
                        </Box>
                        <Dialog open={openbalance} onClose={handleClose}>
                            <DialogTitle>Top Up</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    margin="dense"
                                    id="balance"
                                    label="Top Up"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleChangeBalance}>Top Up</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
                <Box width={"auto"} display={"flex"}>
                    <Button
                        onClick={() => dispatch(setLogout())}
                        sx={{
                            marginX: "auto",
                            backgroundColor: "#EF4565",
                            borderRadius: "12px",
                            padding: "10px 20px 10px 30px",
                            borderRadius: "30px",
                            ":hover": { backgroundColor: "#ff0030" },
                            marginBottom: "60px"
                        }}>  <span style={{ marginRight: "10px", fontWeight: "bold", color: "white" }}>Logout</span><img src={IconLogout} alt="" width={"40px"} /></Button>
                </Box>
            </Box>
        </Container>
    );
}

export default MyAccount;