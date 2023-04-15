import { Box, Button, IconButton, InputAdornment, Link as LinkMaterial, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import Eye from "../../assets/eye.png";
import Invisible from "../../assets/invisible.png"
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState('');
    const [full_name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setCpassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate('');

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { email, full_name, password, confirm_password };
            const response = await axios.post(BASE_URL + "/account/reset-password", data)
            const title = "Password Change Complete"
            const message = "Your password has been changed, and you have been logged into your account. You Will be redirected back to the site in 5 seconds"
            navigate("/account/email-confirmation", { state: { title: title, message: message } })
        } catch (err) {
            setErrorMessage('*Confirm New Password must be matched with New Password');
            setEmail("")
            setName("")
            setPassword("")
            setCpassword("")
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
                padding: "40px 0",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center"
            }}>
                <Box mx={"auto"} component={"form"} onSubmit={handleSubmit} sx={{
                    backgroundColor: "#094067",
                    width: "fit-content",
                    height: "fit-content",
                    padding: { sm: "20px 70px 80px 70px", xs: "20px 40px" },
                    borderRadius: "20px",
                    maxWidth: "450px"
                }}>
                    <h1 style={{
                        fontSize: "48px",
                        textAlign: "center"
                    }} >Register</h1>
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
                                    marginBottom: "30px",
                                }
                            }}
                            type="email"
                            id="Email" />
                    </Box>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Name</Typography>
                        <TextField
                            value={full_name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            InputProps={{
                                sx: {
                                    backgroundColor: "white",
                                    width: { sm: "450px", xs: "350px" },
                                    marginBottom: "30px",
                                }
                            }}
                            id="Name" />
                    </Box>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Password</Typography>
                        <TextField
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                sx: { backgroundColor: "white", width: { sm: "450px", xs: "350px" }, marginBottom: "30px" },
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            <img width="32xpx" src={showPassword ? Invisible : Eye} alt="" />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            id="Password" />
                    </Box>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Confirm Password</Typography>
                        <TextField
                            value={confirm_password}
                            placeholder="Confirm Password"
                            onChange={(e) => setCpassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                sx: { backgroundColor: "white", width: { sm: "450px", xs: "350px" }, marginBottom: "10px" },
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            <img width="32xpx" src={showPassword ? Invisible : Eye} alt="" />
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            id="CPassword" />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="p" color={"red"} sx={{ marginRight: "auto" }}>{errorMessage}</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }} mt={"30px"}>
                        <Button type="submit" variant="contained" sx={{
                            borderRadius: "40px",
                            padding: "15px 60px",
                            fontSize: "16px"
                        }}>Sign Up</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Register;