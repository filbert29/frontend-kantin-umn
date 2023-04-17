import { Box, Container, Typography } from "@mui/material";
import Header from "../../component/Header";
import { Link } from "react-router-dom";
import Star from "../../assets/yellow-star.png"
import BASE_URL from "../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher";
import NoImage from "../../assets/No_Image_Available.jpg"

const ListTenant = () => {
    const url = `${BASE_URL}/tenant`

    const { data: tenants, isLoading, error } = useSWR(url, (url) => fetcher(url, undefined))

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const title = "All Tenant"

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    const CardTransaction = ({ data }) => {
        return (
            <Box display={"grid"} justifyContent={"center"}>
                <Box
                    component={Link}
                    to={`/customer/tenant/detailtenant/${data._id}`}
                    className="shadow-box"
                    sx={{
                        padding: "25px 30px",
                        borderRadius: "10px",
                        width: "600px",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#5F6C7B"
                    }}>
                    <img src={data?.profile_image || NoImage} alt="" width={"134px"} style={{ borderRadius: "15px", minHeight: "129px" }} />
                    <Box className="deskripsi" ml={"25px"} display={"grid"} gap={"2px"}>
                        <Typography variant="p" fontSize={"20px"} fontWeight={"bold"}>{data?.full_name}</Typography>
                        <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                            <img src={Star} alt="" width={"25px"} />
                            <Typography variant="p" fontSize={"14px"}>4.7 (12)</Typography>
                        </Box>
                        <Typography variant="p" fontSize={"14px"}>{data?.description}</Typography>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Container
            sx={{
                maxWidth: { md: "md", sm: "sm" }
            }}>
            <Box
                className="order-detail"
                sx={{
                    backgroundColor: "#fffffe",
                    boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                    minHeight: "97.5vh",
                    padding: "20px 20px",
                    color: "#5F6C7B",
                    paddingBottom: "120px"
                }}>
                <Header title={title} />
                {tenants ? tenants.map(tenant => (
                    <>
                        <CardTransaction data={tenant} />
                        <Liner />
                    </>
                )) : <Typography variant="h1">No Data</Typography>}
            </Box>
        </Container >
    );
}

export default ListTenant;