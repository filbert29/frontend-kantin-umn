import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Link as LinkMaterial, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import Eye from "../../assets/eye.png";
import Invisible from "../../assets/invisible.png"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { email, password };

            const response = await fetch(BASE_URL + "/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const respData = await response.json()

            console.log(respData);
        } catch (error) {
            console.log(error.json());
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
                    <Box sx={{ textAlign: "right" }}>
                        <LinkMaterial component={Link} to={'/account/register'} underline="none" color='white' sx={{ ":hover": { textDecoration: "underline" } }}>forgot password?</LinkMaterial>
                    </Box>
                    <Box sx={{ textAlign: "center" }} mt={"30px"}>
                        <Button type="submit" variant="contained" sx={{
                            borderRadius: "40px",
                            padding: "15px 60px",
                            fontSize: "16px"
                        }}>Login</Button>
                    </Box>
                    <Box>
                        <Typography textAlign={"center"} sx={{ mt: "80px", mb: "80px" }} component="p">or sign up Using <br /> <Typography color={"white"} component={Link} to="/signup" >Sign Up</Typography> </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;