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
                maxWidth: { md: "md", sm: "sm" }
            }}>
            <Box
                className="my-account"
                sx={{
                    backgroundColor: "#fffffe",
                    boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                    minHeight: "97.5vh",
                    padding: "20px 20px",
                    color: "#5F6C7B"
                }}>
                <Header title={title} />
                <Box className="main"
                    sx={{
                        paddingLeft: "40px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px"
                    }}>
                    <Box className="profile-ficture">
                        <img src={ProfilePicture} alt="" width={"160px"} />
                    </Box>
                    <Box className="name-tag" display={"grid"} gap={"10px"}>
                        <Typography variant="p" fontSize={"24px"} fontWeight={"bold"}>{customer.full_name}</Typography>
                        <Chip label="Customer" sx={{ fontWeight: "bold", backgroundColor: "#094067", color: "white", width: "100px", paddingY: "17px" }} />
                    </Box>

                </Box>
                <Box className="data diri shadow-box"
                    m={"30px"}
                    sx={{
                        padding: "40px",
                        borderRadius: "18px",
                        display: "grid",
                        gap: "40px"
                    }}>
                    <Box className="name" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" fontSize={"18px"}>Display Name</Typography>
                        <Box>
                            <Typography variant="p" fontSize={"24px"}>{customer.full_name}</Typography>
                            <Button
                                onClick={handleClickOpenName}
                                sx={{
                                    float: "right",
                                    backgroundColor: "#D8EEFE",
                                    padding: "0",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: "#86c7f7" }
                                }}> <span style={{ margin: "8px 20px", fontWeight: "bold" }}>Edit</span> <img src={IconEdit} alt="" width={"40px"} /></Button>
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
                    <Box className="Email" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" fontSize={"18px"}>Email</Typography>
                        <Box>
                            <Typography variant="p" fontSize={"24px"}>{accountData.email}</Typography>
                            <Button
                                onClick={handleClickOpenEmail}
                                sx={{
                                    float: "right",
                                    backgroundColor: "#D8EEFE",
                                    padding: "0",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: "#86c7f7" }
                                }}> <span style={{ margin: "8px 20px", fontWeight: "bold" }}>Edit</span> <img src={IconEdit} alt="" width={"40px"} /></Button>
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
                    <Box className="Email" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" fontSize={"18px"}>Password</Typography>
                        <Box>
                            <Typography variant="p" fontSize={"24px"}>********</Typography>
                            <Button
                                onClick={handleClickOpenPassword}
                                sx={{
                                    float: "right",
                                    backgroundColor: "#D8EEFE",
                                    padding: "0",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: "#86c7f7" }
                                }}> <span style={{ margin: "8px 20px", fontWeight: "bold" }}>Change Password</span> <img src={IconEdit} alt="" width={"40px"} /></Button>
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
                    m={"30px"}
                    sx={{
                        padding: "40px",
                        borderRadius: "18px",
                        display: "grid",
                        gap: "40px"
                    }}>
                    <Box className="balance" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" fontSize={"18px"}>Balance</Typography>
                        <Box>
                            <Typography variant="p" fontSize={"24px"}>Rp. <span style={{ fontSize: "48px" }}>124.000</span></Typography>
                            <Button sx={{
                                float: "right",
                                backgroundColor: "#3DA9FC",
                                borderRadius: "12px",
                                ":hover": { backgroundColor: "#0090ff" }
                            }}> <img src={IconPlus} alt="" width={"40px"} /> <span style={{ margin: "8px 20px", fontWeight: "bold", color: "white" }}>Top up</span></Button>
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
                            ":hover": { backgroundColor: "#ff0030" }
                        }}>  <span style={{ marginRight: "10px", fontWeight: "bold", color: "white" }}>Top up</span><img src={IconLogout} alt="" width={"40px"} /></Button>
                </Box>
            </Box>
        </Container>
    );
}

export default MyAccount;