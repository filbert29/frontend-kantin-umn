import { Box } from "@mui/material";
import ErrorImage from "./../../assets/error.svg"

const ErrorApi = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
            }}
        >
            <Box
                component={"img"}
                src={ErrorImage}
                alt=""
                width={512}
                sx={{
                    maxWidth: "100%", 
                }}
            />
        </Box>
    );
}

export default ErrorApi;