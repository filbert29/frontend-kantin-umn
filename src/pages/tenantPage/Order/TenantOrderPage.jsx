import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, CircularProgress, Container, Divider, MenuItem, Paper, Rating, Select, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import { useSelector } from "react-redux";
import Loading from "../../../component/state/loading";
import ErrorApi from "../../../component/state/ErrorApi";
import moment from "moment";
import { formatThousand } from "../../../helper/number";
import DFlexJustifyContentBetween from "../../../component/general/DFlexJustifyContentBetween";
import axios from "axios";
import ORDER_STATUS from "../../../config/order-status.config";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionTimer from "../../../component/general/ActionTimer";

const customAccordionStyle = {
    boxShadow: "none",
}

const TenantOrderPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const value = searchParams.get("type") || "on-progress"

    const handleChange = (_, newValue) => {
        setSearchParams({ type: newValue })
    };

    return (
        <Container>
            <Box>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} >
                    <Tab value={"on-progress"} label="On Progress" />
                    <Tab value={"history"} label="History" />
                </Tabs>
            </Box>
            {value === "on-progress" && (
                <OnProgressOrder />
            )}
            {value === "history" && (
                <HistoryOrder />
            )}
        </Container>
    );
}

export default TenantOrderPage;

const OnProgressOrder = () => {
    const [priority, setPriority] = useState("fcfs")
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: order, isLoading, error, mutate } = useSWR(`${BASE_URL}/order/on-progress?priority=${priority}`, (url) => fetcher(url, access_token))

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    return (
        <Box sx={{ mt: 2 }}>
            <Box my={2} >
                <Typography component="p" variant="p" fontWeight={600} mb={1} >Order Priority</Typography>
                <Select fullWidth={true} value={priority} onChange={(event) => { setPriority(event.target.value) }}>
                    <MenuItem value="fcfs">First Come First</MenuItem>
                    <MenuItem value="sjf">Shortest Job First</MenuItem>
                </Select>
            </Box>
            <Accordion defaultExpanded={true} sx={customAccordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Typography sx={{ width: "100%" }} fontWeight={"bold"} >
                        Pending
                    </Typography>
                    {order?.created?.length > 0 &&
                        <Chip label={order?.created?.length} color="info" size="small" />
                    }
                </AccordionSummary>
                <AccordionDetails sx={{ background: "rgba(0,0,0,0.05)", p: 2, display: "grid", rowGap: 2 }} >
                    {order?.created?.length > 0 ? (
                        order?.created?.map((item, index) => (
                            <OnProgressOrderCard key={item?._id} order={item} index={index} mutate={mutate} />
                        ))

                    ) : (
                        <NoOrder />
                    )}
                </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion defaultExpanded={true} sx={customAccordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Typography sx={{ width: "100%" }} fontWeight={"bold"}>
                        On Progress
                    </Typography>
                    {order?.preparing?.length > 0 &&
                        <Chip label={order?.preparing?.length} color="info" size="small" />
                    }
                </AccordionSummary>
                <AccordionDetails sx={{ background: "rgba(0,0,0,0.05)", p: 2, display: "grid", rowGap: 2 }}>
                    {order?.preparing?.length > 0 ? (
                        order?.preparing?.map((item, index) => (
                            <OnProgressOrderCard key={item?._id} order={item} index={index} mutate={mutate} />
                        ))

                    ) : (
                        <NoOrder />
                    )}
                </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion defaultExpanded={true} sx={customAccordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Typography sx={{ width: "100%" }} fontWeight={"bold"}>
                        Ready
                    </Typography>
                    {order?.ready?.length > 0 &&
                        <Chip label={order?.ready?.length} color="info" size="small" />
                    }
                </AccordionSummary>
                <AccordionDetails sx={{ background: "rgba(0,0,0,0.05)", p: 2, display: "grid", rowGap: 2 }}>
                    {order?.ready?.length > 0 ? (
                        order?.ready?.map((item, index) => (
                            <OnProgressOrderCard key={item?._id} order={item} index={index} mutate={mutate} />
                        ))

                    ) : (
                        <NoOrder />
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

const HistoryOrder = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: orders, isLoading, error } = useSWR(`${BASE_URL}/order`, (url) => fetcher(url, access_token))
    const [filter, setFilter] = useState("all")

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    const showOrder = () => {
        if (orders?.length > 0) {
            const orderData = orders?.filter((item) => filter === "all" ? item : item?.status === filter)
            if (orderData?.length > 0) {
                let date = ""
                return (
                    orderData.map((item) => {
                        const dateItem = moment(item?.progress?.created).format("LL")
                        const today = moment().format("LL")
                        if (date !== dateItem) {
                            if (dateItem === today) date = "Today"
                            else date = dateItem

                            return (
                                <Box key={item?._id}>
                                    <Typography component="p" variant="p" fontSize={20} fontWeight={600} mb={2} >{date}</Typography>
                                    <OrderCard order={item} />
                                </Box>
                            )
                        } else {
                            return (
                                <OrderCard order={item} key={item?._id} />
                            )
                        }
                    })
                )
            } else {
                return <NoOrder />
            }
        } else {
            return <NoOrder />
        }
    }

    return (
        <Box sx={{ mt: 2, display: "grid", rowGap: 3 }}>
            <Box sx={{ overflowX: "auto", display: "flex", gap: 2, pb: 2 }}>
                <Chip sx={{ px: 1 }} onClick={() => setFilter("all")} label={"All"} variant={filter === "all" ? "filled" : "outlined"} />
                {Object.entries(ORDER_STATUS).map(([key, value]) => (
                    <Chip sx={{ px: 1 }} onClick={() => setFilter(key)} color={value.color} label={value.label} variant={filter === key ? "filled" : "outlined"} key={key} />
                ))}
            </Box>

            {showOrder()}
        </Box>
    )
}

const OnProgressOrderCard = ({ order, index, mutate = undefined }) => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const [loading, setLoading] = useState({ action: undefined, state: false })

    const navigate = useNavigate()

    const handleAction = async (action) => {
        setLoading({ action: action, state: true })
        try {
            await axios.patch(`${BASE_URL}/order/${action}/${order?._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            console.log("sini")
        } catch (error) {
            console.log(error)
        } finally {
            mutate()
            setLoading({ action: undefined, state: false })
        }
    }

    return (
        <Box sx={{ cursor: "pointer", ":hover": { background: "#fafafa" } }} p={2} component={Paper} elevation={1}>
            <Box onClick={() => { navigate(`/tenant/order/${order?._id}`) }}>
                <DFlexJustifyContentBetween sx={{ mb: 1 }}>
                    <Typography variant="h6" >
                        #{index + 1}
                    </Typography>
                    <Typography sx={{ color: "gray" }} variant="p" fontSize={14} textAlign={"right"} >
                        {order?.customer?._id}
                    </Typography>
                </DFlexJustifyContentBetween>

                <DFlexJustifyContentBetween>
                    <Typography variant="p" fontSize={15} fontWeight={500}>{order?.customer?.full_name}</Typography>
                    <Typography variant="p" fontSize={14}>{moment(order?.progress?.created).format("HH:mm:ss")}</Typography>
                </DFlexJustifyContentBetween>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Box>
                    {order?.items?.map((item, index) => (
                        <DFlexJustifyContentBetween key={index}>
                            <Typography variant="p" fontSize={14}>{item?.quantity} x {item?.menu?.title}</Typography>
                            <Typography variant="p" fontSize={14}>Rp. {formatThousand(item?.price * item?.quantity)}</Typography>
                        </DFlexJustifyContentBetween>
                    ))}
                    <DFlexJustifyContentBetween sx={{ mt: 1 }}>
                        <Typography variant="p" fontSize={14} fontWeight={600}>Total</Typography>
                        <Typography variant="p" fontSize={14} fontWeight={600}>Rp. {formatThousand(order?.total_price)}</Typography>
                    </DFlexJustifyContentBetween>
                    <DFlexJustifyContentBetween sx={{ mt: 1 }}>
                        <Typography variant="p" fontSize={14} fontWeight={600}>Prep Duration</Typography>
                        <Typography variant="p" fontSize={14} fontWeight={600}>{order?.total_prep_duration} Minutes</Typography>
                    </DFlexJustifyContentBetween>
                </Box>
                <Divider sx={{ mt: 2 }} />
            </Box>

            {order?.status === "created" && (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        onClick={() => handleAction("reject")}
                        sx={{ width: "30%" }}
                        size="small"
                        variant="contained"
                        color="error"
                        disabled={loading.state}
                    >
                        {loading.state && loading.action === "reject" ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Reject"}
                    </Button>
                    <Button
                        onClick={() => handleAction("confirm")}
                        sx={{ width: "70%" }}
                        size="small"
                        variant="contained"
                        color="success"
                        disabled={loading.state}
                    >
                        {loading.state && loading.action === "confirm" ? (
                            <CircularProgress sx={{ color: "white" }} size={20} />
                        ) : (
                            <>
                                Accept &nbsp; <ActionTimer time={order?.progress?.created} onFinish={() => { mutate() }} />
                            </>
                        )}

                    </Button>
                </Box>
            )}

            {order?.status === "preparing" && (
                <Button
                    onClick={() => handleAction("ready")}
                    fullWidth={true}
                    size="small"
                    variant="contained"
                    color="secondary"
                    disabled={loading.state}
                >
                    {loading.state ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Mark as ready"}
                </Button>
            )}

            {order?.status === "ready" && (
                <Button
                    onClick={() => handleAction("complete")}
                    fullWidth={true}
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={loading.state}
                >
                    {loading.state ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Mark as complete"}
                </Button>
            )}
        </Box>
    )
}

const NoOrder = () => (
    <Typography variant="p" fontSize={14} fontWeight={500} textAlign="center">
        No Order
    </Typography>
)

const OrderCard = ({ order }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ cursor: "pointer", ":hover": { background: "#fafafa" } }} onClick={() => navigate(`/tenant/order/${order?._id}`)} p={2} component={Paper} elevation={1}>
            <DFlexJustifyContentBetween>
                <Typography sx={{ color: "rgba(0,0,0,0.75)" }} variant="p" fontSize={12}>{order?._id}</Typography>
                <Chip
                    size="small"
                    label={ORDER_STATUS[order?.status].label}
                    color={ORDER_STATUS[order?.status]?.color || "default"}
                />
            </DFlexJustifyContentBetween>
            <DFlexJustifyContentBetween sx={{ mt: 1 }}>
                <Typography component="p" fontSize={16} fontWeight={500}>{order?.customer?.full_name}</Typography>
                <Typography variant="p" fontSize={12}>{moment(order?.progress?.created).format("DD MMM YYYY, hh:mm:ss")}</Typography>
            </DFlexJustifyContentBetween>
            <Typography
                component="p"
                sx={{
                    mt: 1,
                    fontSize: 14,
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                {order?.items?.map((item) => `${item?.quantity} ${item?.menu?.title}`).join(", ")}
            </Typography>

            <Divider sx={{ mt: 2 }} />
            <DFlexJustifyContentBetween sx={{ mt: 1 }}>
                <Box>
                    <Typography component="p" variant="p" fontSize={14} fontWeight={600}>
                        Rp. {formatThousand(order?.total_price)}
                    </Typography>
                    <Typography component="p" variant="p" fontSize={12} fontWeight={500}>
                        {order?.items?.reduce((acc, item) => acc + item?.quantity, 0)} Items
                    </Typography>
                </Box>
                {order?.review ? (
                    <Rating name="read-only" value={4.1} readOnly size="medium" precision={0.1} />
                ) : (
                    <Typography component="p" variant="p" fontSize={13} fontWeight={500}>No reviews yet</Typography>
                )}
            </DFlexJustifyContentBetween>
        </Box>
    )
}
