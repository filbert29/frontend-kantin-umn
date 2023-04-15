import { Box, Button, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import axios from "axios";

const RequestResetPassword = () => {
    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { email };
            const response = await axios.post(BASE_URL + "/account/request-reset-password", data)
            const title = "Reset Password Link"
            const message = "We have sent  email to " + email + " to confirm the validity of your email address. After receiving the email follow link provided to complete your reset password. The link is only valid for a maximum of 30 minutes"
            navigate("/account/email-confirmation", { state: { title: title, message: message } })
        } catch (err) {
            setErrorMessage('*' + err.response.data.message);
            setEmail("")
        }
    }

    return (
        <Box sx={{
            // width: "100vw",
            minHeight: "100vh",
            background: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: "white",
        }}>
            <Box sx={{
                // width: "100vw",
                minHeight: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center"
            }}>
                <Box mx={"auto"} component={"form"} onSubmit={handleSubmit} sx={{
                    backgroundColor: "#094067",
                    width: "fit-content",
                    height: "fit-content",
                    padding: { sm: "20px 70px 70px 70px", xs: "20px 40px" },
                    borderRadius: "20px",
                }}>
                    <Box sx={{
                        marginBottom: "30px"
                    }}>
                        <h1 style={{
                            fontSize: "48px",
                            textAlign: "center",
                            marginBottom: "10px"
                        }} >Reset Password</h1>
                        <Typography
                            variant="p"
                            component={"p"}
                            maxWidth={"400px"}
                            textAlign={"center"}
                            margin={"0px auto"}>Enter your <span style={{ fontWeight: "bold" }}>email address</span> that you used to register. We'll send you an email with your username and a link to reset your password.</Typography>
                    </Box>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Email</Typography>
                        <TextField
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                sx: {
                                    backgroundColor: "white",
                                    width: { sm: "450px", xs: "350px" },
                                    marginBottom: "10px",
                                }
                            }}
                            type="email"
                            id="Email" />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="p" color={"red"} sx={{ marginRight: "auto" }}>{errorMessage}</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }} mt={"30px"}>
                        <Button type="submit" variant="contained" sx={{
                            borderRadius: "40px",
                            padding: "15px 60px",
                            fontSize: "16px"
                        }}>Send</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RequestResetPassword;