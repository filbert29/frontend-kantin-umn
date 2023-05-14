import MenuImage from "../../../assets/tenant/menu.png";
import OrderImage from "../../../assets/tenant/order.png";
import ProfileImage from "../../../assets/tenant/profile.png";
import ReviewImage from "../../../assets/tenant/review.jpg";

import { ArrowForwardIos, Star } from "@mui/icons-material";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../../helper/fetcher";
import { useSelector } from "react-redux";
import Loading from "../../../component/state/Loading";
import ErrorApi from "../../../component/state/ErrorApi";
import BASE_URL from "../../../config/BASE_URL";
import { formatThousand } from "../../../helper/number";



const TenantHomePage = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: tenant, isLoading, error } = useSWR(`${BASE_URL}/tenant/dashboard`, (url) => fetcher(url, access_token))
    const [maximizeDescription, setMaximizeDescription] = useState(false)

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    return (
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
                        <Typography variant="h4" fontWeight={"bold"}>{tenant?.full_name}</Typography>
                        <Typography
                            variant="p"
                            sx={{
                                mt: 1,
                                display: maximizeDescription ? "block" : "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {tenant?.description}
                        </Typography>
                        <Typography component={"span"} variant="p" sx={{ cursor: "pointer" }} onClick={() => setMaximizeDescription(!maximizeDescription)}>{maximizeDescription ? " Lihat Sedikit" : " Lihat Semua"}</Typography>
                        <Typography
                            variant="p"
                            component="p"
                            sx={{ display: "flex", alignItems: "center", mt: 2, fontSize: "18px" }}>
                            <Star sx={{ color: "#FFDF00", fontSize: "30px" }} /> &nbsp; {tenant?.rating} ({tenant?.total_review})
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                        <Box sx={{
                            textAlign: { xs: "center", sm: "right" },
                        }}>
                            <Box
                                component={"img"}
                                // src="https://picsum.photos/id/292/600/600"
                                src={tenant?.profile_image}
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
                            title={"Jumlah Saldo"}
                            value={`Rp. ${formatThousand(tenant?.balance)}`}
                            handleClick={() => { }}
                            clickLabel={"Withdraw"}
                        />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <CardStatistics title={"Jumlah Pesanan"} value={tenant?.total_order} />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <CardStatistics title={"Pesanan Hari Ini"} value={tenant?.total_order_today} />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <CardStatistics title={"Total Penilaian"} value={tenant?.total_review} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 8 }}>
                <Grid container spacing={2}>
                    <Grid item md={3} xs={6}>
                        <CardActionMenu
                            title={"Semua Menu"}
                            image={MenuImage}
                            path={"/tenant/menu"}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <CardActionMenu
                            title={"Semua Pesanan"}
                            image={OrderImage}
                            path={"/tenant/order"}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <CardActionMenu
                            title={"Semua Penilaian"}
                            image={ReviewImage}
                            path={"/tenant/review"}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <CardActionMenu
                            title={"Profil"}
                            image={ProfileImage}
                            path={"/tenant/profile"}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
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
                    <Typography variant="h5" fontWeight={"bold"}>{value}</Typography>
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