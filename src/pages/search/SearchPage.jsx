import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SearchIcon from "../../assets/icons8-search-32.png";
import Arrow from "../../assets/arrow-alltenant.png"

import { Link } from "react-router-dom";

function SearchPage() {

    return (
        <Container
            sx={{
                maxWidth: { md: "md", sm: "sm" }
            }}>
            <Box
                sx={{
                    backgroundColor: "#fffffe",
                    boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                    minHeight: "97.5vh",
                    paddingTop: "20px",
                    color: "#5F6C7B",
                    paddingBottom: "100px"
                }}>
                <Box
                    className="search-box"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "18px 0px 18px 35px",
                        margin: {md: "0px 50px", xs: "0px 20px"},
                        borderRadius: "40px",
                        boxShadow: "1px 1px 30px -1px rgba(109, 109, 109, 0.5)",
                        textDecoration: "none"
                    }}>
                    <img src={SearchIcon} width={"35px"} alt="" />
                    <TextField autoFocus className="search-page" placeholder="Cari di Kantin UMN"></TextField>
                </Box>
                <Box component={Link} to={"/customer/search/listtenant"}
                    sx={{
                        padding: "38px 0px 20px 50px",
                        margin: "0px 40px",
                        fontSize: "18px",
                        borderBottom: "1px black solid",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#5F6C7B"
                    }}>
                    <Typography variant="p">All Tenant</Typography>
                    <img src={Arrow} alt="" width={"20px"} style={{ marginLeft: "auto", marginRight: "50px" }} />
                </Box>
            </Box>
        </Container >
    )
}

export default SearchPage