import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import Header from "../../component/Header";
import PicTenant from "../../assets/pic-tenant.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import '../../assets/style/styleHistory.css'

const History = () => {
    const title = "Cart"

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

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
                        <img src={PicTenant} alt="" />
                        <Box className="deskripsi" sx={{
                            display: "grid"
                        }}>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "20px", xs: "16px" },
                                    fontWeight: "bold"
                                }}>{data?.tenant}</Typography>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "16px", xs: "12px" }
                                }}>{data?.foods}</Typography>
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
                            }}>Total Price: Rp. {data?.price}</Typography>
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

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                            </TabPanel>
                            <TabPanel value="2">
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                                <Liner />
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                                <Liner />
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                            </TabPanel>
                        </TabContext>
                    </Box>

                </Box>
            </Container >
        </div>
    );
}

export default History;

