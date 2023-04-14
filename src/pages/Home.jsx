import { Box, Button, Container, Typography } from "@mui/material";
import SearchIcon from "../assets/icons8-search-32.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/style/styleHome.css"
import HomeBanner from "../assets/home-banner1.png"
import IconTenant from "../assets/icon-tenant.png"
import IconFood from "../assets/icon-food.png"
import IconRandom from "../assets/icon-random.png"
import TenantCardComponent from "../component/TenantCardComponent";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import FoodCardComponent from "../component/FoodCardComponent";

function Home() {

    return (
        <Container
            sx={{
                maxWidth: { md: "md", sm: "sm" }
            }}>
            <Box
                className="Home"
                sx={{
                    backgroundColor: "#fffffe",
                    boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                    minHeight: "97.5vh",
                    paddingTop: "20px",
                    color: "#5F6C7B",
                    paddingBottom: "100px"
                }}>
                <Box
                    component={Link}
                    to={"/search/searchpage"}
                    className="search-box"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "18px 0px 18px 35px",
                        margin: "0px 50px",
                        borderRadius: "40px",
                        boxShadow: "1px 1px 30px -1px rgba(109, 109, 109, 0.5)",
                        textDecoration: "none"
                    }}>
                    <img src={SearchIcon} width={"35px"} alt="" />
                    <Typography component={"p"} variant="p" ml={"30px"} color={"#626262"}>Cari Tenant atau Makanan kesukaan kamu disini</Typography>
                </Box>
                <Box
                    className="home-banner"
                    sx={{
                        padding: "20px",
                        marginTop: "20px"
                    }}>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper">
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                    </Swiper>
                </Box>
                <Box
                    className="filter-icon"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "10px 0px",
                        gap: "5%"
                    }}>
                    <Box
                        className="icon-button"
                        sx={{
                            display: "grid",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "15%"
                        }}>
                        <img src={IconTenant} alt="" width={"100%"} />
                        <Typography
                            variant="p"
                            textAlign={"center"}
                            fontSize={"18px"}>Tenant</Typography>
                    </Box>
                    <Box
                        className="icon-button"
                        sx={{
                            display: "grid",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "15%"
                        }}>
                        <img src={IconFood} alt="" width={"100%"} />
                        <Typography
                            variant="p"
                            textAlign={"center"}
                            fontSize={"18px"}>Food</Typography>
                    </Box>
                    <Box
                        className="icon-button"
                        sx={{
                            display: "grid",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "15%"
                        }}>
                        <img src={IconRandom} alt="" width={"64px"} />
                        <Typography
                            variant="p"
                            textAlign={"center"}
                            fontSize={"18px"}>Random</Typography>
                    </Box>
                </Box>
                <Box
                    className="section-list"
                    sx={{
                        display: "grid",
                        padding: "20px 20px",
                        gap: "30px"
                    }}>
                    <Box className="tenant">
                        <Box width={"100%"} mb="10px">
                            <Typography variant="p" fontSize={"32px"} fontWeight={"bold"} pl={"20px"}>
                                Tenant
                            </Typography>
                            <Button variant="p" sx={{
                                backgroundColor: "#D8EEFE",
                                float: "right",
                                color: "#3DA9FC",
                                borderRadius: "30px",
                                padding: "10px 25px"
                            }}>See all</Button>
                        </Box>
                        <Box
                            className="list-tenant"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "3%"
                            }}>
                            <TenantCardComponent />
                            <TenantCardComponent />
                            <TenantCardComponent />
                            <TenantCardComponent />
                        </Box>
                    </Box>

                    <Box className="foods">
                        <Box width={"100%"} mb="10px">
                            <Typography variant="p" fontSize={"32px"} fontWeight={"bold"} pl={"20px"}>
                                Foods
                            </Typography>
                            <Button variant="p" sx={{
                                backgroundColor: "#D8EEFE",
                                float: "right",
                                color: "#3DA9FC",
                                borderRadius: "30px",
                                padding: "10px 25px"
                            }}>See all</Button>
                        </Box>
                        <Box
                            className="list-food"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "3%"
                            }}>
                            <FoodCardComponent />
                            <FoodCardComponent />
                            <FoodCardComponent />
                            <FoodCardComponent />
                        </Box>
                    </Box>
                </Box>
                {/* <div className="App">
                    <div className="search-section">
                        <img alt="" />
                        <a href="#" style={{ marginLeft: '15px' }}>Cari Tenant atau Makanan kesukaan kamu disini</a>
                    </div>
                </div> */}
            </Box>
        </Container >
    )
}

export default Home