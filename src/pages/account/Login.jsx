import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Link as LinkMaterial, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { Link } from "react-router-dom";

function Login() {

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
                <Box mx={"auto"} component={"form"} sx={{
                    backgroundColor: "#094067",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "20px 50px 20px 50px",
                    borderRadius: "20px",
                }}>
                    <h1 style={{
                        fontSize: "48px",
                        textAlign: "center"
                    }} >LOGIN</h1>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Username</Typography>
                        <TextField InputProps={{ sx: { backgroundColor: "white", width: "370px", marginBottom: "30px" } }} id="Name"></TextField>
                    </Box>
                    <Box>
                        <Typography component={"p"} variant="p" sx={{ marginBottom: "15px" }}>Password</Typography>
                        <TextField InputProps={{ sx: { backgroundColor: "white", width: "370px", marginBottom: "10px" } }} id="Password"></TextField>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                        <LinkMaterial component={Link} to={'/account/register'} underline="none" color='white' sx={{ ":hover": { textDecoration: "underline" } }}>forgot password?</LinkMaterial>
                    </Box>
                    <Box sx={{ textAlign: "center" }} mt={"30px"}>
                        <Button variant="contained" sx={{
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