import { Box, Button, Container, Typography } from "@mui/material";
import Header from "../../component/Header";
import { Link } from "react-router-dom";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import BASE_URL from "../../config/BASE_URL"
import { useSelector } from "react-redux";
import CardCart from "../../component/CardCart";

const ListCart = () => {

    const { accountData } = useSelector((state) => state.auth)

    const title = "Cart"

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    const url = `${BASE_URL}/cart`

    // const { data: cart, isLoading, error } = useSWR(url, (url) => fetcher(url, undefined))
    const { data: cart, isLoading, error, mutate } = useSWR(url, (url) => fetcher(url, accountData?.access_token))


    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    console.log(cart)

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
                    <Box mb={"10px"} sx={{
                        paddingLeft: {md: "80px", xs: "0px"}
                    }}>
                        <Typography variant="p"
                        fontSize={"20px"} fontWeight={"bold"}>Order List</Typography>
                    </Box>
                    {cart ? cart.map(cart => (
                        <Box>
                            <CardCart cart={cart} />
                            <Liner />
                        </Box>
                    )) : <Typography variant="h1">No Data</Typography>}

                    {/* <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                    <Liner />
                    <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                    <Liner />
                    <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} /> */}
                </Box>
            </Container >
        </div>
    );
}

export default ListCart;

