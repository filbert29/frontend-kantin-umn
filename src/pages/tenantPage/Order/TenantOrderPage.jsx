import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Container, Divider, MenuItem, Select, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import { useSelector } from "react-redux";
import Loading from "../../../component/state/Loading";
import ErrorApi from "../../../component/state/ErrorApi";
import moment from "moment";
import ORDER_STATUS from "../../../config/order-status.config";
import { useSearchParams } from "react-router-dom";
import OnProgressOrderCard from "../../../component/tenant/OrderOnProgressCard";
import OrderCard from "../../../component/tenant/OrderCard";

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
    const { data: order, isLoading, error, mutate } = useSWR(`${BASE_URL}/order/on-progress?priority=${priority}`, (url) => fetcher(url, access_token), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
    })

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    return (
        <Box sx={{ mt: 2 }}>
            <Box my={2} >
                <Typography component="p" variant="p" fontWeight={600} mb={1} >Prioritas</Typography>
                <Select fullWidth={true} value={priority} onChange={(event) => { setPriority(event.target.value) }}>
                    <MenuItem value="fcfs">Pesanan paling dahulu</MenuItem>
                    <MenuItem value="sjf">Pesanan paling singkat</MenuItem>
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
                        Dalam Proses
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
                        Siap Diambil
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
                            let currentDate
                            if (dateItem === today) {
                                currentDate = "Today"
                            } else {
                                currentDate = dateItem
                            }
                            date = dateItem

                            return (
                                <Box key={item?._id}>
                                    <Typography component="p" variant="p" fontSize={20} fontWeight={600} mb={2} >{currentDate}</Typography>
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
                <Chip sx={{ px: 1 }} onClick={() => setFilter("all")} label={"Semua"} variant={filter === "all" ? "filled" : "outlined"} />
                {Object.entries(ORDER_STATUS).map(([key, value]) => (
                    <Chip sx={{ px: 1 }} onClick={() => setFilter(key)} color={value.color} label={value.label} variant={filter === key ? "filled" : "outlined"} key={key} />
                ))}
            </Box>

            {showOrder()}
        </Box>
    )
}

const NoOrder = () => (
    <Typography variant="p" fontSize={14} fontWeight={500} textAlign="center">
        Tidak ada pesanan
    </Typography>
)