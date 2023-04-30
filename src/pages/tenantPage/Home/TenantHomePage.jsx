import { ArrowForwardIos, Star } from "@mui/icons-material";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuImage from "../../../assets/tenant/menu.png";
import OrderImage from "../../../assets/tenant/order.png";
import ProfileImage from "../../../assets/tenant/profile.png";
import ReviewImage from "../../../assets/tenant/review.jpg";

const TenantHomePage = () => {
    const [maximizeDescription, setMaximizeDescription] = useState(false)
    return (
        <Box>
            <Container>
                <Box
                    sx={{
                        background: "black",
                        borderRadius: "10px",
                        color: "white",
                        padding: "40px",
                    }}
                    component={Paper}
                    elevation={3}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h4" fontWeight={"bold"}>Kedai Nasi Goreng</Typography>
                            <Typography
                                variant="p"
                                sx={{
                                    mt: 1,
                                    display: maximizeDescription ? "block"
                                        : "-webkit-box", "-webkit-line-clamp": "1", "-webkit-box-orient": "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis animi qui quis similique quos ad praesentium consequuntur! Quis pariatur molestias quas. Minus autem quam obcaecati nisi ex eos non voluptatum.
                            </Typography>
                            <Typography component={"span"} variant="p" sx={{ cursor: "pointer" }} onClick={() => setMaximizeDescription(!maximizeDescription)}>{maximizeDescription ? " Show Less" : " Show More"}</Typography>
                            <Typography
                                variant="p"
                                component="p"
                                sx={{ display: "flex", alignItems: "center", mt: 2, fontSize: "24px" }}>
                                <Star sx={{ color: "#FFDF00", fontSize: "30px" }} /> &nbsp; 4.7 (12)
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                            <Box sx={{
                                textAlign: { xs: "center", sm: "right" },
                            }}>
                                <Box
                                    component={"img"}
                                    src="https://picsum.photos/id/292/600/600"
                                    alt=""
                                    width={156}
                                    height={156}
                                    sx={{ borderRadius: "10px", border: "8px solid white", objectFit: "cover" }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={6} xs={12}>
                            <CardStatistics
                                title={"Your Balance"}
                                value={"Rp650.000"}
                                handleClick={() => { }}
                                clickLabel={"Withdraw"}
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <CardStatistics title={"Total Order"} value={12} />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <CardStatistics title={"Total Order Today"} value={12} />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <CardStatistics title={"Total Review"} value={12} />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 8 }}>
                    <Grid container spacing={2}>
                        <Grid item md={3} xs={6}>
                            <CardActionMenu
                                title={"All Menu"}
                                image={MenuImage}
                                path={"/tenant/menu"}
                            />
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <CardActionMenu
                                title={"All Order"}
                                image={OrderImage}
                                path={"/tenant/order"}
                            />
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <CardActionMenu
                                title={"All Review"}
                                image={ReviewImage}
                                path={"/tenant/review"}
                            />
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <CardActionMenu
                                title={"Profile"}
                                image={ProfileImage}
                                path={"/tenant/profile"}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default TenantHomePage;

const CardStatistics = ({ title, value, handleClick = undefined, clickLabel = undefined }) => {
    return (
        <Box
            sx={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
            }}
            component={Paper}
            elevation={3}
        >
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="p" fontWeight={"bold"}>{title}</Typography>
                    <Typography variant="h4" fontWeight={"bold"}>{value}</Typography>
                </Grid>
                {clickLabel && (
                    <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <Button
                            onClick={handleClick ? handleClick : null}
                            color="primary"
                            endIcon={<ArrowForwardIos />}
                        >
                            {clickLabel}
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

const CardActionMenu = ({ title, image, path }) => {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => navigate(path)}
            sx={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
            }}
            component={Paper}
            elevation={3}
        >
            <Box
                component={"img"}
                src={image}
                alt=""
                width={128}
                height={128}
                sx={{ borderRadius: "10px", objectFit: "contain" }} />
            <Typography variant="h5" fontWeight={"bold"}>{title}</Typography>
        </Box>
    )
}