import { Box, Button, IconButton, InputAdornment, Link as LinkMaterial, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import Eye from "../../assets/eye.png";
import Invisible from "../../assets/invisible.png"
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState('');
    const [temp_full_name, setTempName] = useState('');
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

    function capitalizeFirstLetter(str) {
        return str.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      }

    useEffect(() => {
        setName(capitalizeFirstLetter(temp_full_name))
        console.log(full_name)
    }, [temp_full_name])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password != confirm_password) {
            setErrorMessage('*Confirm New Password must be matched with New Password');
        } else {
            try {
                const data = { email, full_name, password, confirm_password };
                const response = await axios.post(BASE_URL + "/account/register", data)
                const title = "Email Confirmation"
                const message = `We have sent  email to ` + email + ` to confirm the validity of your email address. After receiving the email follow link provided to complete your registration`
                navigate("/account/email-confirmation", { state: { title: title, message: message } })
            } catch (err) {
                console.log(err.response.data.error)
                setErrorMessage(err.response.data.error);
                setEmail("")
                setTempName("")
                setPassword("")
                setCpassword("")
            }
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
                    padding: { sm: "20px 70px 80px 70px", xs: "20px 0px" },
                    borderRadius: "20px",
                    maxWidth: "450px"
                }}>
                    <Typography variant="h1" sx={{
                        fontSize: { sm: "48px", xs: "40px" },
                        textAlign: "center",
                        margin: { sm: "50px", xs: "30px" },
                        fontWeight: "bold",
                        fontFamily: "Poppins"
                    }} >Register</Typography>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Email</Typography>
                        <TextField
                            required
                            value={email}
                            placeholder="ex: myname@example.com"
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
                    <Box mb={3}>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Name</Typography>
                        <TextField
                            required
                            value={temp_full_name}
                            placeholder="Name"
                            onChange={(e) => setTempName(e.target.value)}
                            InputProps={{
                                sx: {
                                    backgroundColor: "white",
                                    width: { sm: "450px", xs: "320px" },
                                    marginBottom: "5px",
                                }
                            }}
                            id="Name" />
                        <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>ex. Filbert Khouwira</Typography>
                    </Box>
                    <Box mb={3}>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Password</Typography>
                        <TextField
                            required
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                sx: {
                                    backgroundColor: "white", width: { sm: "450px", xs: "320px" },
                                    marginBottom: "5px"
                                },
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
                        <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>minimum 6 characters</Typography>
                    </Box>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Confirm Password</Typography>
                        <TextField
                            required
                            value={confirm_password}
                            placeholder="Confirm Password"
                            onChange={(e) => setCpassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                sx: {
                                    backgroundColor: "white", width: { sm: "450px", xs: "320px" },
                                    marginBottom: "10px"
                                },
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
                    <Box sx={{ display: "flex", width: { sm: "450px", xs: "300px" } }}>
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