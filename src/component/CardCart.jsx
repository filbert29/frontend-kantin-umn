import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PicTenant from "../assets/pic-tenant.png"


const CardCart = ({ cart }) => {
    return (
        <Box display={"grid"} justifyContent={"center"}>
            <Box className="shadow-box"
                sx={{
                    padding: "25px 30px",
                    borderRadius: "10px",
                    width: "600px"
                }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "25px",
                    }}>
                    <img src={cart?.tenant?.profile_image} alt="" width={"120px"} style={{ borderRadius: "15px" }}/>
                    <Box className="deskripsi" sx={{
                        display: "grid"
                    }}>
                        <Typography variant="p" fontSize={"20px"} fontWeight={"bold"}>{cart?.tenant?.full_name}</Typography>
                        <Typography variant="p" fontSize={"16px"}>
                            {cart?.items[0].menu?.title}
                            {cart?.items?.menu ? cart?.items?.menu.slice(1).map(menu => (
                                <span>, {menu?.title}</span>
                            )) : <span></span>}
                        </Typography>
                    </Box>
                </Box>
                <Box className="price-control" sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <Typography variant="p" fontWeight={"bold"}>Total Price: Rp. {cart?.total.toLocaleString("id-ID")}</Typography>
                    <Button component={Link} to={`/customer/order/orderconfirmation/${cart?.tenant?._id}`} sx={{
                        backgroundColor: "#3DA9FC",
                        color: "white",
                        fontFamily: "Poppins",
                        ":hover": { backgroundColor: "#058ffa" }
                    }}>Checkout</Button>
                    <Button sx={{
                        backgroundColor: "#EF4565",
                        color: "white",
                        fontFamily: "Poppins",
                        ":hover": { backgroundColor: "#f00a35" }
                    }}>Delete</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CardCart;