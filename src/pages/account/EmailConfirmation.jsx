import { Box, Button, TextField, Typography } from "@mui/material";
import Background from "../../assets/background-login.png"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import EmailConfirmIcon from "../../assets/email-confirm.png"

const EmailConfirmation = () => {
    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate('');

    const location = useLocation();

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
                <Box mx={"auto"} component={"form"} sx={{
                    backgroundColor: "#094067",
                    width: "fit-content",
                    height: "fit-content",
                    padding: { sm: "20px 70px 70px 70px", xs: "20px 40px" },
                    borderRadius: "20px",
                }}>
                    <Box sx={{
                        marginBottom: "30px",
                        display: "grid"
                    }}>
                        <img src={EmailConfirmIcon} alt="" style={{
                            margin: "0px auto"
                        }} />
                        <h1 style={{
                            fontSize: "48px",
                            textAlign: "center",
                            margin: "10px 0px"
                        }} >{location.state.title}</h1>
                        <Typography
                            variant="p"
                            component={"p"}
                            maxWidth={"500px"}
                            textAlign={"center"}
                            margin={"0px auto"}>{location.state.message}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EmailConfirmation;