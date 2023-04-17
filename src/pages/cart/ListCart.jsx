import { Box, Button, Container, Typography } from "@mui/material";
import Header from "../../component/Header";
import PicTenant from "../../assets/pic-tenant.png"

const ListCart = () => {
    const title = "Cart"

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
                    <Box mb={"10px"}>
                        <Typography variant="p" ml={"80px"} fontSize={"20px"} fontWeight={"bold"}>Order List</Typography>
                    </Box>
                    <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                    <Liner />
                    <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                    <Liner />
                    <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                    <Liner />
                    <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                </Box>
            </Container >
        </div>
    );
}

export default ListCart;

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
                    <img src={PicTenant} alt="" />
                    <Box className="deskripsi" sx={{
                        display: "grid"
                    }}>
                        <Typography variant="p" fontSize={"20px"} fontWeight={"bold"}>{data?.tenant}</Typography>
                        <Typography variant="p" fontSize={"16px"}>{data?.foods}</Typography>
                    </Box>
                </Box>
                <Box className="price-control" sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <Typography variant="p" fontWeight={"bold"}>Total Price: Rp. {data?.price}</Typography>
                    <Button sx={{
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