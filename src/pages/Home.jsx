import { Box, Button, Container, Typography } from "@mui/material";
import SearchIcon from "../assets/icons8-search-32.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/style/styleHome.css"
import HomeBanner from "../assets/home-banner1.png"
import TenantCardComponent from "../component/TenantCardComponent";
import useSWR from 'swr'
import fetcher from "../helper/fetcher";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";


import { Navigation, Pagination, Autoplay, FreeMode } from "swiper";
import { Link, useNavigate } from "react-router-dom";
import FoodCardComponent from "../component/FoodCardComponent";
import BASE_URL from "../config/BASE_URL";
import { useEffect, useRef, useState } from "react";

function Home() {

    const [cardAmount, setCardAmount] = useState(4)

    const screenWidth = window.innerWidth

    useEffect(() => {
        if (screenWidth < 420) {
            setCardAmount(2)
        } else if (screenWidth < 650) {
            setCardAmount(3)
        } else {
            setCardAmount(4)
        }
    }, [])

    const urlRandomTenant = `${BASE_URL}/random-tenant`
    const urlRandomMenus = `${BASE_URL}/random-menu`

    const { data: tenants, isLoading: isLoadingRandomTenant, error: errorRandomTenant } = useSWR(urlRandomTenant, (url) => fetcher(url, undefined))
    const { data: menus, isLoading: isLoadingRandomMenus, error: errorRandomMenus } = useSWR(urlRandomMenus, (url) => fetcher(url, undefined))

    if (errorRandomTenant) return <div>failed to load</div>
    if (isLoadingRandomTenant) return <div>loading...</div>

    if (errorRandomMenus) return <div>failed to load</div>
    if (isLoadingRandomMenus) return <div>loading...</div>


    return (
        <Container
            sx={{
                maxWidth: { md: "md", sm: "md" }
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
                    to={"/customer/search/searchpage"}
                    className="search-box"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "18px 0px 18px 35px",
                        margin: { md: "0px 50px", xs: "0px 20px" },
                        borderRadius: "40px",
                        boxShadow: "1px 1px 10px -1px rgba(109, 109, 109, 0.5)",
                        textDecoration: "none"
                    }}>
                    <img src={SearchIcon} width={"35px"} alt="" />
                    <Typography component={"p"} variant="p" ml={"30px"} color={"#626262"}>Cari di Kantin UMN</Typography>
                </Box>
                <Box
                    className="home-banner"
                    sx={{
                        padding: { md: "20px", xs: "10px" },
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
                        // navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper">
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                        <SwiperSlide> <img src={HomeBanner} alt="" /></SwiperSlide>
                    </Swiper>
                </Box>
                <Box
                    className="section-list"
                    sx={{
                        // display: "grid",
                        padding: "20px 20px",
                        // gap: "30px"
                    }}>
                    <Box className="tenant" mb={"20px"}>
                        <Box width={"100%"} mb="10px">
                            <Typography variant="p"
                                sx={{
                                    fontSize: { xs: "24px", md: "32px" },
                                    fontWeight: "bold",
                                    paddingLeft: "20px"
                                }}>
                                Tenant
                            </Typography>
                            <Button
                                component={Link}
                                to={"/customer/search/listtenant"}
                                variant="p"
                                sx={{
                                    backgroundColor: "#D8EEFE",
                                    float: "right",
                                    color: "#3DA9FC",
                                    borderRadius: "30px",
                                    padding: "10px 25px"
                                }}>See all</Button>
                        </Box>
                        <Swiper
                            slidesPerView={cardAmount}
                            spaceBetween={15}
                            freeMode={true}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper-tenant"
                        >
                            {tenants ? tenants.slice(0, 4).map(tenant => (
                                <SwiperSlide className="tenant-swiper"> <TenantCardComponent tenant={tenant} /> </SwiperSlide>
                            )) : <Typography variant="h1">No Data</Typography>}
                        </Swiper>

                        {/* <Box
                            className="list-tenant"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "3%"
                            }}>
                            {tenants ? tenants.slice(0, 2).map(tenant => (
                                <TenantCardComponent tenant={tenant} />
                            )) : <Typography variant="h1">No Data</Typography>}
                        </Box> */}
                    </Box>

                    <Box className="foods">
                        <Box width={"100%"} mb="10px">
                            <Typography variant="p"
                                sx={{
                                    fontSize: { xs: "24px", md: "32px" },
                                    fontWeight: "bold",
                                    paddingLeft: "20px"
                                }}>
                                Menu
                            </Typography>
                            <Button variant="p"
                                component={Link}
                                to={"/customer/search/listtenant"}
                                sx={{
                                    backgroundColor: "#D8EEFE",
                                    float: "right",
                                    color: "#3DA9FC",
                                    borderRadius: "30px",
                                    padding: "10px 25px"
                                }}>See all</Button>
                        </Box>
                        <Swiper
                            slidesPerView={cardAmount}
                            spaceBetween={15}
                            freeMode={true}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper-tenant"
                        >
                            {menus ? menus.slice(0, 4).map(menu => (
                                <SwiperSlide className="tenant-swiper"> <FoodCardComponent menu={menu} /> </SwiperSlide>
                            )) : <Typography variant="h1">No Data</Typography>}
                        </Swiper>
                        {/* <Box
                            className="list-food"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "3%"
                            }}>
                            {menus ? menus.slice(0, 4).map(menu => (
                                <FoodCardComponent menu={menu} />
                            )) : <Typography variant="h1">No Data</Typography>}
                        </Box> */}
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