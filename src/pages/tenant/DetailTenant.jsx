import { Box, Button, Container, FormControl, InputBase, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
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

function DetailTenant() {
    const title = "Detail Tenant"
    const [tenantname, setTenantName] = useState('Kedai Nasi Goreng')
    const [deskripsi, setDeskripsi] = useState('Aneka Nasi Goreng')
    const [rating, setRating] = useState('4.7 (12)')
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

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

    return (
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
                    padding: "20px 20px",
                    color: "#5F6C7B"
                }}>
                <Header title={title} />
                <Box sx={{
                    backgroundImage: `url(${BgBanner})`,
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
                            padding: "40px 60px"
                        }}>
                        <Typography variant="p" fontSize={"36px"} fontWeight={"bold"}>{tenantname}</Typography>
                        <Typography variant="p" fontSize={"24px"}>{deskripsi}</Typography>
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
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}><span>Nasi Goreng</span></MenuItem>
                                <MenuItem value={20}><span>Minuman</span></MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        width: "40%",
                        alignItems: "center",
                        boxShadow: "inset 0px 0px 4px 2px rgba(0,0,0,0.1)",
                        borderRadius: "50px",
                        height: "70px",
                        marginTop: "32px",
                        paddingLeft: "20px"
                    }}>
                        <img src={SearchIcon} alt="" width={"50px"} height={"50px"} />
                        <TextField placeholder="Cari">Cari</TextField>
                    </Box>
                </Box>
                <Box className="foods" mt={"10px"}>
                    <Box width={"100%"} mb="10px">
                        <Typography variant="p" fontSize={"32px"} fontWeight={"bold"} pl={"20px"} color={"#094067"}>
                            Nasi
                        </Typography>
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
                            <Box className="box-review"
                                sx={{
                                    backgroundImage: `url(${BoxReview})`,
                                    // border: "1px solid black",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    minHeight: "110px",
                                    width: "280px",
                                    padding: "40px 0px 0px 40px",
                                    display: "inline-block",
                                    marginRight: "15px"
                                }}>
                                <Typography variant="p" color={"#094067"}>Enak Banget nasgornya..</Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingTop: "5px",
                                    gap: "5px"
                                }}>
                                    <img src={YellowStar} alt="" width={"30px"} />
                                    <Typography variant="p">5 . Najim Rizky</Typography>
                                </Box>
                            </Box>
                            <Box className="box-review"
                                sx={{
                                    backgroundImage: `url(${BoxReview})`,
                                    // border: "1px solid black",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    minHeight: "110px",
                                    width: "280px",
                                    padding: "40px 0px 0px 40px",
                                    display: "inline-block",
                                    marginRight: "15px"
                                }}>
                                <Typography variant="p" color={"#094067"}>Enak Banget nasgornya..</Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingTop: "5px",
                                    gap: "5px"
                                }}>
                                    <img src={YellowStar} alt="" width={"30px"} />
                                    <Typography variant="p">5 . Najim Rizky</Typography>
                                </Box>
                            </Box>
                            <Box className="box-review"
                                sx={{
                                    backgroundImage: `url(${BoxReview})`,
                                    // border: "1px solid black",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    minHeight: "110px",
                                    width: "280px",
                                    padding: "40px 0px 0px 40px",
                                    display: "inline-block",
                                    marginRight: "15px"
                                }}>
                                <Typography variant="p" color={"#094067"}>Enak Banget nasgornya..</Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingTop: "5px",
                                    gap: "5px"
                                }}>
                                    <img src={YellowStar} alt="" width={"30px"} />
                                    <Typography variant="p">5 . Najim Rizky</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="minuman" mt={"25px"}>
                        <Box width={"100%"} mb="10px">
                            <Typography variant="p" fontSize={"32px"} fontWeight={"bold"} pl={"20px"} color={"#094067"}>
                                Minuman
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "30px"
                        }}>
                            <Box className="card-lebar"
                                sx={{
                                    boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                                    padding: "30px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "45%",
                                    flex: "50"
                                }}>
                                <img src={JusJeruk} alt="" width={"150px"} />
                                <Box className="deskripsi" ml={"25px"} display={"grid"}>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Jus Jeruk</Typography>
                                    <Typography variant="p" fontSize={"14px"}>minuman dari jeruk</Typography>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Rp. 7.000</Typography>
                                </Box>
                            </Box>
                            <Box className="card-lebar"
                                sx={{
                                    boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                                    padding: "30px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "45%",
                                    flex: "50"
                                }}>
                                <img src={JusJeruk} alt="" width={"150px"} />
                                <Box className="deskripsi" ml={"25px"} display={"grid"}>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Jus Jeruk</Typography>
                                    <Typography variant="p" fontSize={"14px"}>minuman dari jeruk</Typography>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Rp. 7.000</Typography>
                                </Box>
                            </Box>
                            <Box className="card-lebar"
                                sx={{
                                    boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                                    padding: "30px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "45%",
                                    flex: "50"
                                }}>
                                <img src={JusJeruk} alt="" width={"150px"} />
                                <Box className="deskripsi" ml={"25px"} display={"grid"}>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Jus Jeruk</Typography>
                                    <Typography variant="p" fontSize={"14px"}>minuman dari jeruk</Typography>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Rp. 7.000</Typography>
                                </Box>
                            </Box>
                            <Box className="card-lebar"
                                sx={{
                                    boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                                    padding: "30px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "45%",
                                    flex: "50"
                                }}>
                                <img src={JusJeruk} alt="" width={"150px"} />
                                <Box className="deskripsi" ml={"25px"} display={"grid"}>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Jus Jeruk</Typography>
                                    <Typography variant="p" fontSize={"14px"}>minuman dari jeruk</Typography>
                                    <Typography variant="p" fontSize={"18px"} fontWeight={"bold"}>Rp. 7.000</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default DetailTenant