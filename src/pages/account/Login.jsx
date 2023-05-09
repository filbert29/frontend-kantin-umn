import { Box, Button, IconButton, InputAdornment, Link as LinkMaterial, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import Eye from "../../assets/eye.png";
import Invisible from "../../assets/invisible.png"
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/Auth";
import axios from "axios";

const Login = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [errorMessage, setErrorMessage] = useState('');

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { email, password };
            const response = await axios.post(BASE_URL + "/account/login", data)
            dispatch(setLogin(response?.data?.data))
        } catch (err) {
            setErrorMessage('*' + err.response.data.message);
            setEmail("")
            setPassword("")
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
                padding: { sm: "40px 0", xs: "0" },
                backgroundColor: { sm: "rgba(0, 0, 0, 0.5)", xs: "#094067" },
                display: "flex",
                alignItems: "center"
            }}>
                <Box mx={"auto"} component={"form"} onSubmit={handleSubmit} sx={{
                    backgroundColor: "#094067",
                    width: "fit-content",
                    height: "fit-content",
                    padding: { sm: "20px 70px", xs: "20px 0px" },
                    borderRadius: "20px",
                }}>
                    <Typography variant="h1" sx={{
                        fontSize: {sm: "48px", xs: "40px"},
                        textAlign: "center",
                        margin: { sm: "50px", xs: "30px" },
                        fontWeight: "bold",
                        fontFamily: "Poppins"
                    }} >LOGIN</Typography>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Username</Typography>
                        <TextField
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                sx: {
                                    backgroundColor: "white",
                                    width: { sm: "450px", xs: "320px" },
                                    marginBottom: "30px",
                                }
                            }}
                            type="email"
                            id="Email" />
                    </Box>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Password</Typography>
                        <TextField
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                sx: { backgroundColor: "white", width: { sm: "450px", xs: "320px" }, marginBottom: "10px" },
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
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="p" color={"red"} sx={{ marginRight: "auto" }}>{errorMessage}</Typography>
                        <LinkMaterial component={Link} to={'/account/request-reset-password'} underline="none" color='white' sx={{ ":hover": { textDecoration: "underline" } }}>forgot password?</LinkMaterial>
                    </Box>
                    <Box sx={{ textAlign: "center" }} mt={"30px"}>
                        <Button type="submit" variant="contained" sx={{
                            borderRadius: "40px",
                            padding: "15px 60px",
                            fontSize: "16px"
                        }}>Login</Button>
                    </Box>
                    <Box>
                        <Typography textAlign={"center"}
                            sx={{
                                mt: {sm: "80px", xs: "40px"},
                                mb: {sm: "80px", xs: "40px"}
                            }}
                            component="p">or sign up Using <br /> <Typography color={"white"} component={Link} to="/account/register" >Sign Up</Typography> </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;