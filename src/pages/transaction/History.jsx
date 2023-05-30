import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Tab, Tabs, TextField, Typography } from "@mui/material";
import Header from "../../component/Header";
import PicTenant from "../../assets/pic-tenant.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import '../../assets/style/styleHistory.css'
import BASE_URL from "../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../store/Notification";

const History = () => {
    const title = "History"

    const [value, setValue] = useState('1');
    const [valueRating, setValueRating] = useState(1);
    const [open, setOpen] = useState(false)
    const [review, setReview] = useState('')
    const [idOrder, setIdOrder] = useState('')

    const dispatch = useDispatch()

    const handleOpen = (id) => {
        setIdOrder(id)
        setOpen(true);
        // console.log(id)
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { accountData } = useSelector((state) => state.auth)

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    const urlOrder = `${BASE_URL}/order/`
    const { data: order, isLoading, error, mutate } = useSWR(urlOrder, (url) => fetcher(url, accountData?.access_token))


    if (isLoading) return <div>loading...</div>
    if (error) return <div>failed to load</div>

    const handleAddReview = async (e) => {
        e.preventDefault();

        try {
            const content = review;
            const rating = valueRating;
            const id = idOrder;
            const add_review = { rating, content };
            const response = await axios.post(BASE_URL + `/order/review/${id}`, add_review, {
                headers: {
                    Authorization: `Bearer ${accountData?.access_token}`
                },
            })
            setReview('');
            setOpen(false)
            setValueRating(1)
            dispatch(addNotification({
                message: "Success add review to tenant",
                type: "success"
            }))
        } catch (err) {
            setReview('');
            setOpen(false)
            setValueRating(1)
            dispatch(addNotification({
                message: "Failed add review to tenant",
                type: "error"
            }))
        }
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
                        <img src={data?.tenant?.profile_image} alt="" />
                        <Box className="deskripsi" sx={{
                            display: "grid"
                        }}>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "20px", xs: "14px" },
                                    fontWeight: "bold"
                                }}>{data?.tenant?.full_name}</Typography>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "16px", xs: "12px" }
                                }}>{data?.items ? data?.items.map(menus => (
                                    <span key={menus.menu._id}>{menus?.menu?.title},</span>
                                )) : <Typography variant="h1">No Data</Typography>}</Typography>
                            <Typography variant="p"
                                sx={{
                                    fontSize: { sm: "20px", xs: "14px" },
                                    fontWeight: "bold"
                                }}>{data?.status}</Typography>
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
                            }}>Total Price: Rp. {data?.total_price}</Typography>
                        <Button component={Link} to={`/customer/order/orderdetail/${data?._id}`} sx={{
                            backgroundColor: "#3DA9FC",
                            color: "white",
                            fontFamily: "Poppins",
                            paddingX: "20px",
                            ":hover": { backgroundColor: "#058ffa" }
                        }}>Detail</Button>
                        {data?.status === "completed" && !data?.review ? (
                            <Button
                                onClick={() => handleOpen(data?._id)}
                                sx={{
                                    backgroundColor: "white",
                                    color: "#3DA9FC",
                                    fontFamily: "Poppins",
                                    paddingX: "20px",
                                    border: "1px solid #3DA9FC"
                                }}>Review</Button>
                        ) : (<></>)}
                    </Box>
                </Box>
            </Box>
        )
    }

    const handleClose = () => {
        setReview('');
        setOpen(false)
        setValueRating(1)
        setIdOrder(undefined)
    };

    // console.log(order)

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <Rating
                        name="simple-controlled"
                        value={valueRating}
                        onChange={(event, newValue) => {
                            setValueRating(newValue);
                        }}
                    />
                    <TextField
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                        margin="dense"
                        id="review"
                        label="How was the food?"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddReview}>Submit</Button>
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
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                    <Tab sx={{ width: "50%", textTransform: "capitalize", fontFamily: "Poppins", fontSize: { md: "25px", xs: "15px" } }} label="On Progress" value="1" />
                                    <Tab sx={{ width: "50%", textTransform: "capitalize", fontFamily: "Poppins", fontSize: { md: "25px", xs: "15px" } }} label="History" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {order ? order.map(order => {
                                    if (order?.status == "ready" || order?.status == "created" || order?.status == "preparing" ) {
                                        return (
                                            <Box key={order?._id}>
                                                <CardCart data={order} />
                                                <Liner />
                                            </Box>
                                        )
                                    }
                                }) : <Typography variant="h1">No Data</Typography>}
                            </TabPanel>
                            <TabPanel value="2">
                                {order ? order.map(order => {
                                    if (order?.status == "completed" || order?.status == "rejected") {
                                        return (
                                            <Box key={order?._id}>
                                                <CardCart data={order} />
                                                <Liner />
                                            </Box>
                                        )
                                    }
                                }) : <Typography variant="h1">No Data</Typography>}
                                {/* <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                                <Liner />
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} />
                                <Liner />
                                <CardCart data={{ tenant: "Kedai Nasi Goreng", foods: "Nasi Goreng, Jus jeruk", price: 23000 }} /> */}
                            </TabPanel>
                        </TabContext>
                    </Box>

                </Box>
            </Container >
        </div>
    );
}

export default History;

