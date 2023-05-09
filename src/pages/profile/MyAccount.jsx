import { Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import Header from "../../component/Header";
import ProfilePicture from "../../assets/profile-picture.png"
import { useState } from "react";
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


const MyAccount = () => {
    const title = "My Account"

    const [change_email, setChangeEmail] = useState('')
    const [change_full_name, setChangeFullName] = useState('')

    const [errorMessage, setErrorMessage] = useState('');

    const [openname, setOpenName] = useState(false);
    const [openemail, setOpenEmail] = useState(false);
    const [openpassword, setOpenPassword] = useState(false);

    const { accountData } = useSelector((state) => state.auth)

    const [password, setPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [confirm_new_password, setConfirmPassword] = useState('')

    const handleClickOpenName = () => {
        setOpenName(true);
    };

    const handleClickOpenEmail = () => {
        setOpenEmail(true);
    };

    const handleClickOpenPassword = () => {
        setOpenPassword(true);
    };

    const handleClose = () => {
        setOpenName(false);
        setOpenEmail(false);
        setOpenPassword(false);
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
                    <Box className="profile-ficture">
                        <img src={ProfilePicture} alt="" width={"160px"} />
                    </Box>
                    <Box className="name-tag" display={"grid"} gap={"10px"}>
                        <Typography variant="p" sx={{ fontSize: { md: "24px", xs: "20px" }, fontWeight: "bold" }}>{customer.full_name}</Typography>
                        <Chip label="Customer" sx={{ fontWeight: "bold", backgroundColor: "#094067", color: "white", width: "100px", paddingY: "17px" }} />
                    </Box>

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
                            <Typography variant="p" sx={{ fontSize: { md: "24px", xs: "18px" } }}>Rp. <Typography variant="span" sx={{ fontSize: { md: "48px", xs: "28px" } }}>124.000</Typography></Typography>
                            <Button sx={{
                                minWidth: "0",
                                float: "right",
                                backgroundColor: "#3DA9FC",
                                borderRadius: "12px",
                                ":hover": { backgroundColor: "#0090ff" }
                            }}> <img src={IconPlus} alt="" width={"40px"} /> <Typography variant="span" sx={{ margin: "8px 20px", fontWeight: "bold", display: { md: "block", xs: "none" } }}>Top up</Typography></Button>
                        </Box>
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