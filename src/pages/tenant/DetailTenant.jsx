import { Box, Button, Container, FormControl, Grid, InputBase, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../../component/Header"
import { useState } from "react"
import YellowStar from "../../assets/yellow-star.png"
import { styled } from '@mui/material/styles';
import "../../assets/style/styleDetailTenant.css"
import SearchIcon from "../../assets/search-icon.png"
import FoodCardComponent from "../../component/FoodCardComponent"
import BoxReview from "../../assets/box-review.png"
import JusJeruk from "../../assets/jus-jeruk.png"
import BgBanner from "../../assets/bg-banner-detail.png"
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import BASE_URL from "../../config/BASE_URL"
import NoImage from "../../assets/No_Image_Available.jpg"
import axios from "axios";
import { useSelector } from "react-redux"


function DetailTenant() {
    const title = "Detail Tenant"
    const [tenantname, setTenantName] = useState('Kedai Nasi Goreng')
    const [deskripsi, setDeskripsi] = useState('Aneka Nasi Goreng')
    const [rating, setRating] = useState('4.7 (12)')
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('')

    const [selectedMenu, setSelectedMenu] = useState()

    const [amount, setAmount] = useState(1)

    const { accountData } = useSelector((state) => state.auth)

    const [open, setOpen] = useState(false)

    const handleOpen = (menu) => {
        setOpen(true)
        setSelectedMenu(menu)
    };

    const handleClose = () => {
        setOpen(false)
        setSelectedMenu(undefined)
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const { id } = useParams();

    const urlTenant = `${BASE_URL}/tenant/${id}`

    const { data: tenant, isLoading, error } = useSWR(urlTenant, (url) => fetcher(url, undefined))

    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    const tenant_menus = tenant?.tenant_menu
    const tenant_reviews = tenant?.reviews

    const handleAddtoCart = async (e) => {
        e.preventDefault();

        const menu_id = selectedMenu?._id;
        const quantity = amount;

        try {
            const add_cart = { menu_id, quantity };
            const response = await axios.post(BASE_URL + `/cart/${id}`, add_cart, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            handleClose();
            setMessage('*Success add to cart');
        } catch (err) {
            setMessage('*Cannot add to cart');
        }
    }

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(4),
        },
        '& .MuiInputBase-input': {
            width: "100%",
            borderRadius: 40,
            border: '',
            boxShadow: "inset 0px 0px 4px 2px rgba(0,0,0,0.1)",
            fontSize: 32,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.,
            '&:focus': {
                borderRadius: 40,
                borderColor: '',
                boxShadow: '',
            },
        },
    }));

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: "10px"
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Box sx={{
                        display: "grid",
                        gap: "10px"
                    }}>
                        <img src={selectedMenu?.image || NoImage} width={"100%"} alt="" />
                        <Typography variant="p" fontSize={"20px"} fontWeight={"bold"}>{selectedMenu?.title}</Typography>
                        <Typography variant="p">{selectedMenu?.price}</Typography>
                        <Box display={"flex"}>
                            <Button onClick={() => setAmount(amount > 0 ? amount - 1 : amount)}>minus</Button>
                            <TextField type="number" value={amount}></TextField>
                            <Button onClick={() => setAmount(amount + 1)}>plus</Button>
                        </Box>
                        <Button onClick={handleAddtoCart}>Add to Cart</Button>
                    </Box>
                </Box>
            </Modal>
            <Container
                sx={{
                    maxWidth: { md: "md", sm: "sm" }
                }}>
                <Box
                    className="detail-tenant"
                    sx={{
                        backgroundColor: "#fffffe",
                        boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                        minHeight: "97.5vh",
                        padding: {md: "20px 20px 100px 20px", xs: "20px 0px 100px 0px"},
                        color: "#5F6C7B"
                    }}>
                    <Header title={title} />
                    <Box sx={{
                        backgroundImage: `url(${tenant?.profile_image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        borderRadius: "10px"
                    }}>
                        <Box
                            className="detail-tenant-banner"
                            sx={{
                                color: "white",
                                backgroundColor: "rgba(0,0,0,0.8)",
                                display: "grid",
                                borderRadius: "10px",
                                padding: {md: "40px 60px", xs: "30px 30px"}
                            }}>
                            <Typography variant="p" 
                            sx={{
                                fontSize: {md: "36px", xs: "30px"},
                                fontWeight: "bold"
                            }}>{tenant?.full_name}</Typography>
                            <Typography variant="p"
                            sx={{
                                fontSize: {md: "24px", xs: "18px"}
                            }}
                            >{tenant?.description}</Typography>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                paddingTop: "5px",
                                gap: "5px"
                            }}>
                                <img src={YellowStar} alt="" width={"30px"} />
                                <Typography variant="p" fontSize={"18px"}>{rating}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="section-fitur"
                        sx={{
                            marginTop: "20px",
                            display: "flex",
                            gap: "3%"
                        }}>
                        <Box sx={{ width: "55%" }}>
                            <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                                <Typography variant="p" ml={"20px"}>Category</Typography>
                                <Select
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={age}
                                    onChange={handleChange}
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value="">
                                        <em className="list-category">None</em>
                                    </MenuItem>
                                    <MenuItem value={10}><span className="list-category">Nasi Goreng</span></MenuItem>
                                    <MenuItem value={20}><span className="list-category">Minuman</span></MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            width: "40%",
                            alignItems: "center",
                            boxShadow: "inset 0px 0px 4px 2px rgba(0,0,0,0.1)",
                            borderRadius: "50px",
                            height: {xs: "57px", md: "70px"},
                            marginTop: "32px",
                            paddingLeft: "20px"
                        }}>
                            <img className="img-search" src={SearchIcon} alt="" />
                            <TextField className="search-detail" placeholder="Cari">Cari</TextField>
                        </Box>
                    </Box>
                    <Box className="foods" mt={"10px"}>
                        {/* {menus[0] ? menus.slice(0,4)} */}
                        <Box width={"100%"} mb="10px">
                            <Typography variant="p" fontSize={"32px"} fontWeight={"bold"} pl={"20px"} color={"#094067"}>
                                {tenant_menus[0]?.category?.title || `No Category`}
                            </Typography>
                        </Box>

                        <Grid className="list-food" container spacing={2}>
                            {tenant_menus[0].menu ? tenant_menus[0].menu.slice(0, 4).map(menu => (
                                <Grid item xs={6} sm={4} md={3}><FoodCardComponent menu={menu} handleClick={() => handleOpen(menu)} /></Grid>
                            )) : <Typography variant="h1">No Data</Typography>}
                        </Grid>

                        {/* <Box
                            className="list-food"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "3%"
                            }}>
                            {tenant_menus[0].menu ? tenant_menus[0].menu.slice(0, 4).map(menu => (
                                <FoodCardComponent width={"50%"} menu={menu} handleClick={() => handleOpen(menu)} />
                            )) : <Typography variant="h1">No Data</Typography>}
                        </Box> */}
                        <Box
                            sx={{
                                marginTop: "20px",
                                padding: "20px",
                                borderRadius: "8px",
                                backgroundColor: "#D8EEFE"
                            }}>
                            <Typography variant="p" sx={{ fontSize: "28px", fontWeight: "bold", color: "#094067" }}>Review</Typography>
                            <Box className="section-review" sx={{
                                overflow: "auto",
                                whiteSpace: "nowrap",
                                paddingBottom: "10px"
                            }}>
                                {tenant_reviews.map(review => (
                                    <Box className="box-review"
                                        sx={{
                                            backgroundImage: `url(${BoxReview})`,
                                            // border: "1px solid black",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            minHeight: {md: "110px", xs: "78px"},
                                            width: {md: "280px", xs: "190px"},
                                            padding: {md: "40px 30px 10px 40px", xs: "30px 40px 10px 30px"},
                                            display: "inline-block",
                                            marginRight: "15px"
                                        }}>
                                        <Typography variant="p" color={"#094067"}>{review.content}</Typography>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingTop: "5px",
                                            gap: "5px"
                                        }}>
                                            <img src={YellowStar} alt="" width={"30px"} />
                                            <Typography variant="p">{review.rating} . {review.customer.full_name}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box className="minuman" mt={"25px"}>
                            {tenant_menus ? tenant_menus.slice(1).map(menus => (
                                <>
                                    <Box width={"100%"} mb="10px" mt={"30px"}>
                                        <Typography variant="p" fontSize={"32px"} fontWeight={"bold"} pl={"20px"} color={"#094067"}>
                                            {menus?.category?.title || `No Category`}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "30px"
                                    }}>
                                        {menus?.menu.map(menu => (
                                            <Box className="card-lebar"
                                                sx={{
                                                    boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                                                    padding: {md: "30px", xs: "0px"},
                                                    borderRadius: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    width: "45%",
                                                    flex: "50"
                                                }}>
                                                <img src={menu?.image || NoImage} alt="" width={"150px"} />
                                                <Box className="deskripsi" ml={"25px"} display={"grid"}>
                                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>{menu.title}</Typography>
                                                    <Typography variant="p" fontSize={"14px"}>{menu.description}</Typography>
                                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Rp. {menu?.price.toLocaleString("id-ID")}</Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </>
                            )) : <Typography variant="h1">No Data</Typography>}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default DetailTenant