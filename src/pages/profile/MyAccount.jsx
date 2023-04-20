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


const MyAccount = () => {
    const title = "My Account"

    const [change_email, setChangeEmail] = useState('')
    const [change_full_name, setChangeFullName] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const { accountData } = useSelector((state) => state.auth)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()

    const handleEditName = async (e) => {
        e.preventDefault();

        const email = accountData?.email;
        const full_name = change_full_name;

        try {
            const data = { full_name, email };
            const response = await axios.put(BASE_URL + "/customer/profile", data, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            dispatch(setLogin(full_name))
            // console.log(response)
            setOpen(false);
        } catch (err) {
            setErrorMessage('*' + err.response.data.message);
            setChangeFullName("")
            console.log(err)
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
                        <Typography variant="p" fontSize={"24px"} fontWeight={"bold"}>{accountData.full_name}</Typography>
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
                            <Typography variant="p" fontSize={"24px"}>{accountData.full_name}</Typography>
                            <Button
                                onClick={handleClickOpen}
                                sx={{
                                    float: "right",
                                    backgroundColor: "#D8EEFE",
                                    padding: "0",
                                    borderRadius: "12px",
                                    ":hover": { backgroundColor: "#86c7f7" }
                                }}> <span style={{ margin: "8px 20px", fontWeight: "bold" }}>Edit</span> <img src={IconEdit} alt="" width={"40px"} /></Button>
                        </Box>
                        <Dialog open={open} onClose={handleClose}>
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
                            <Button sx={{
                                float: "right",
                                backgroundColor: "#D8EEFE",
                                padding: "0",
                                borderRadius: "12px",
                                ":hover": { backgroundColor: "#86c7f7" }
                            }}> <span style={{ margin: "8px 20px", fontWeight: "bold" }}>Edit</span> <img src={IconEdit} alt="" width={"40px"} /></Button>
                        </Box>
                    </Box>
                    <Box className="Email" sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <Typography variant="p" fontSize={"18px"}>Password</Typography>
                        <Box>
                            <Typography variant="p" fontSize={"24px"}>********</Typography>
                            <Button sx={{
                                float: "right",
                                backgroundColor: "#D8EEFE",
                                padding: "0",
                                borderRadius: "12px",
                                ":hover": { backgroundColor: "#86c7f7" }
                            }}> <span style={{ margin: "8px 20px", fontWeight: "bold" }}>Change Password</span> <img src={IconEdit} alt="" width={"40px"} /></Button>
                        </Box>
                    </Box>
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