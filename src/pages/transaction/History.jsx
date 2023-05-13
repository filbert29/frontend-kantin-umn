import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import Header from "../../component/Header";
import PicTenant from "../../assets/pic-tenant.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import '../../assets/style/styleHistory.css'
import BASE_URL from "../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import { useSelector } from "react-redux";

const History = () => {
    const title = "History"

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { accountData } = useSelector((state) => state.auth)

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    const urlOrder = `${BASE_URL}/order`
    const { data: order, isLoading, error, mutate } = useSWR(urlOrder, (url) => fetcher(url, accountData?.access_token))


    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    console.log(order)

    const CardCart = ({ data }) => {
        return (
            <Box display={"grid"} justifyContent={"center"}>
                <Box className="shadow-box"
                    sx={{
                        padding: { sm: "25px 30px", xs: "15px 20px" },
                        borderRadius: "10px",
                        width: { md: "600px", sm: "500px", xs: "280px" },
                    }}>
                    <Box
                        className="box-history"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "25px",
                        }}>
                        <img src={data?.tenant?.profile_image} alt="" />
                        <Box className="deskripsi" sx={{
                            display: "grid"
                        }}>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "20px", xs: "14px" },
                                    fontWeight: "bold"
                                }}>{data?.tenant?.full_name}</Typography>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "16px", xs: "12px" }
                                }}>{data?.items ? data?.items.map(menus => (
                                    <>{menus?.menu?.title},</>
                                )) : <Typography variant="h1">No Data</Typography>}</Typography>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "20px", xs: "14px" },
                                    fontWeight: "bold"
                                }}>{data?.status}</Typography>
                        </Box>
                    </Box>
                    <Box className="price-control" sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "20px"
                    }}>
                        <Typography variant="p"
                            sx={{
                                fontSize: { sm: "20px", xs: "14px" },
                                fontWeight: "bold"
                            }}>Total Price: Rp. {data?.total_price}</Typography>
                        <Button component={Link} to={"/customer/order/orderdetail"} sx={{
                            backgroundColor: "#3DA9FC",
                            color: "white",
                            fontFamily: "Poppins",
                            paddingX: "20px",
                            ":hover": { backgroundColor: "#058ffa" }
                        }}>Detail</Button>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <div>
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
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                    <Tab sx={{ width: "50%", textTransform: "capitalize", fontFamily: "Poppins", fontSize: { md: "25px", xs: "15px" } }} label="On Progress" value="1" />
                                    <Tab sx={{ width: "50%", textTransform: "capitalize", fontFamily: "Poppins", fontSize: { md: "25px", xs: "15px" } }} label="History" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                            {order ? order.map(order => {
                                    if (order?.status == "ready" || order?.status == "created") {
                                        return (
                                            <Box>
                                                <CardCart data={order} />
                                                <Liner />
                                            </Box>
                                        )
                                    }
                                }) : <Typography variant="h1">No Data</Typography>}
                            </TabPanel>
                            <TabPanel value="2">
                                {order ? order.map(order => {
                                    if (order?.status == "completed" || order?.status == "rejected") {
                                        return (
                                            <Box>
                                                <CardCart data={order} />
                                                <Liner />
                                            </Box>
                                        )
                                    }
                                }) : <Typography variant="h1">No Data</Typography>}
                                {/* <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                                <Liner />
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                                <Liner />
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} /> */}
                            </TabPanel>
                        </TabContext>
                    </Box>

                </Box>
            </Container >
        </div>
    );
}

export default History;

