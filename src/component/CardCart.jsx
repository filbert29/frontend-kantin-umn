import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PicTenant from "../assets/pic-tenant.png"


const CardCart = ({ cart, toogleDelete }) => {
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
                    <img src={cart?.tenant?.profile_image} alt="" />
                    <Box className="deskripsi" sx={{
                        display: "grid"
                    }}>
                        <Typography variant="p"
                            sx={{
                                fontSize: { sm: "20px", xs: "16px" },
                                fontWeight: "bold"
                            }}>{cart?.tenant?.full_name}</Typography>
                        <Typography variant="p"
                            sx={{
                                fontSize: { sm: "16px", xs: "12px" }
                            }}>{cart?.items[0].menu?.title}
                            {cart?.items ? cart?.items?.slice(1).map(menus => (
                                <>, {menus?.menu.title}</>
                            )) : <span></span>}</Typography>
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
                            fontSize: { sm: "20px", xs: "12px" },
                            fontWeight: "bold"
                        }}>Total Price: Rp. {cart?.total.toLocaleString("id-ID")}</Typography>
                    <Button component={Link} to={`/customer/order/orderconfirmation/${cart?.tenant?._id}`} sx={{
                        backgroundColor: "#3DA9FC",
                        color: "white",
                        fontFamily: "Poppins",
                        ":hover": { backgroundColor: "#058ffa" },
                        fontSize: { sm: "14px", xs: "10px" }
                    }}>Checkout</Button>
                    <Button
                        onClick={ toogleDelete }
                        sx={{
                            backgroundColor: "#EF4565",
                            color: "white",
                            fontFamily: "Poppins",
                            ":hover": { backgroundColor: "#f00a35" },
                            fontSize: { sm: "14px", xs: "10px" }
                        }}>Delete</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CardCart;