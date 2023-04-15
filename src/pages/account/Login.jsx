import { Box, Button, IconButton, InputAdornment, Link as LinkMaterial, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import Eye from "../../assets/eye.png";
import Invisible from "../../assets/invisible.png"
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/Auth";

const Login = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate('');

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password };

        const response = await fetch(BASE_URL + "/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearar "
            },
            body: JSON.stringify(data),
        })
            .then(
                res => res.json()
            ).then(
                data => {
                    if (data.status == "404") {
                        console.log("sini");
                        throw new Error(data.error)
                    } else {
                        dispatch(setLogin(data.data))
                    }
                }
            )
            .catch(error => {
                setErrorMessage('*' + error.message);
                document.getElementById("Email").value = "";
                document.getElementById("Password").value = "";
            })

        console.log(response);
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
                    padding: { sm: "20px 70px", xs: "20px 40px" },
                    borderRadius: "20px",
                }}>
                    <h1 style={{
                        fontSize: "48px",
                        textAlign: "center"
                    }} >LOGIN</h1>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Username</Typography>
                        <TextField
                            placeholder="Username"
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
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Password</Typography>
                        <TextField
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
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
                        <Typography textAlign={"center"} sx={{ mt: "80px", mb: "80px" }} component="p">or sign up Using <br /> <Typography color={"white"} component={Link} to="/account/register" >Sign Up</Typography> </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;