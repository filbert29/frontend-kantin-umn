import { ArrowBack, LocationOn } from "@mui/icons-material";
import { Box, Button, Card, Typography, Grid, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../../config/BASE_URL";
import useSWR from "swr";
import fetcher from "../../../helper/fetcher";
import DefaulltImage from "./../../../assets/default.jpg"

const TenantDetailPage = () => {
    const id = useParams().id;
    const { data, error, isLoading } = useSWR(`${BASE_URL}/tenant/${id} `, fetcher);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <div>
            <Link to={"/admin/tenant"}>
                <Button startIcon={<ArrowBack />}>
                    Back to Tenant
                </Button>
            </Link>
            <Box mt={4}>
                <Box textAlign={"center"} >
                    <img width={"300px"} alt={data?.full_name} src={data?.profile_image || DefaulltImage}></img>
                </Box>
                <Typography variant="h4" component="h1" textAlign={"center"}>
                    {data?.full_name}
                </Typography>
                <Typography variant="p" component="p" textAlign={"center"}>
                    {data?.description}
                </Typography>
                <Typography variant="p" component="p" textAlign={"center"}>
                    <LocationOn fontSize="12px" /> {data?.location}
                </Typography>
                <Box mt={4}>
                    <Typography variant="h5" component="h1">
                        Menu
                    </Typography>
                    <Divider />
                    <Grid container columnGap={3}>
                        <Menus menus={data?.menus} />
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

export default TenantDetailPage;

const Menus = ({ menus }) => {
    return (
        menus?.map((dataMenus, idx) => (
            <>
                {dataMenus.category?.title ? (
                    <Grid item xs={12} key={idx}>
                        <Typography mb={2} mt={4} variant="h6">
                            {dataMenus.category?.title}
                        </Typography>
                    </Grid>
                ) : (
                    <Grid item xs={12} key={idx}>
                        <Typography mb={2} mt={4} variant="h6">No Category</Typography>
                    </Grid>
                )}
                {dataMenus.menu?.map((menu, index) => (
                    <Grid mb={3} item xs={3} key={index}>
                        <Card>
                            <Box p={"20px"}>
                                <img width={"100%"} height={"150px"} style={{ objectFit: "cover" }} alt={menu?.name} src={menu?.image || DefaulltImage} />
                                <Typography fontWeight={"bold"} component="h2">
                                    {menu?.title}
                                </Typography>
                                <Typography height={"2ch"} component="h2">
                                    Rp{(menu?.price).toLocaleString("id-ID")}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </>
        ))
    )
}