import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import Header from "../../component/Header";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import BASE_URL from "../../config/BASE_URL"
import { useSelector } from "react-redux";
import CardCart from "../../component/CardCart";
import axios from "axios"
import { useState } from "react";

const ListCart = () => {

    const { accountData } = useSelector((state) => state.auth)
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false);
    const [tempId, setTempId] = useState('')

    const handleClickOpen = (id) => {
        setTempId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const title = "Cart"

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    const url = `${BASE_URL}/cart`

    // const { data: cart, isLoading, error } = useSWR(url, (url) => fetcher(url, undefined))
    const { data: cart, isLoading, error, isValidating, mutate } = useSWR(url, (url) => fetcher(url, accountData?.access_token))


    if (isLoading || isValidating) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    const handleDeleteCart = async (id) => {
        try {
            const response = await axios.delete(BASE_URL + `/cart/clear/${id}`, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                }
            })
            mutate()
            setMessage('*Success remove from cart');
            handleClose()
        } catch (err) {
            setMessage('*Cannot remove from cart');
        }
    }

    // console.log(tempId)

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Remove this order?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do You want to remove this order from your cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={() => handleDeleteCart(tempId)} autoFocus>
                        Yes, Remove
                    </Button>
                </DialogActions>
            </Dialog>
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
                        paddingLeft: { md: "80px", xs: "0px" }
                    }}>
                        <Typography variant="p"
                            fontSize={"20px"} fontWeight={"bold"}>Order List</Typography>
                    </Box>
                    {cart ? cart.map(cart => (
                        <Box>
                            <CardCart cart={cart} toogleDelete={() => handleClickOpen(cart?.tenant?._id)} />
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

