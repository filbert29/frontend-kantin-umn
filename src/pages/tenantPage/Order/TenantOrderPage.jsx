import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Container, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
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
import { useTimer } from "react-timer-hook";

const customAccordionStyle = {
    boxShadow: "none",
}

const TenantOrderPage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} >
                    <Tab label="On Progress" />
                    <Tab label="History" />
                </Tabs>
            </Box>
            {value === 0 && (
                <OnProgressOrder />
            )}
            {value === 1 && (
                <HistoryOrder />
            )}
        </Container>
    );
}

export default TenantOrderPage;

const OnProgressOrder = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: order, isLoading, error } = useSWR(`${BASE_URL}/order/on-progress`, (url) => fetcher(url, access_token))

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    return (
        <Box sx={{ mt: 2 }}>
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
                            <OrderCard key={item?._id} order={item} index={index} />
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
                            <OrderCard key={item?._id} order={item} index={index} />
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
                            <OrderCard key={item?._id} order={item} index={index} />
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
    return (
        <Box>
            History
        </Box>
    )
}

const OrderCard = ({ order, index }) => {
    return (
        <Box p={2} component={Paper} elevation={1}>
            <DFlexJustifyContentBetween sx={{ mb: 1 }}>
                <Typography variant="h6" >
                    #{index + 1}
                </Typography>
                <Typography variant="p" fontSize={14} textAlign={"right"} >
                    {order?.customer?._id}
                </Typography>
            </DFlexJustifyContentBetween>

            <DFlexJustifyContentBetween>
                <Typography variant="p" fontSize={15} fontWeight={500}>{order?.customer?.full_name}</Typography>
                <Typography variant="p" fontSize={15}>{moment(order?.progress?.created).format("HH:mm")}</Typography>
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

            {order?.status === "created" && (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button sx={{ width: "30%" }} size="small" variant="contained" color="error">Reject</Button>
                    <Button sx={{ width: "70%" }} size="small" variant="contained" color="success">Accept &nbsp; <RejectTimer time={order?.progress?.created} onFinish={() => { alert(order?._id + "Auto Rejected") }} /> </Button>
                </Box>
            )}

            {order?.status === "preparing" && (
                <Button fullWidth={true} size="small" variant="contained" color="success">Mark as ready</Button>
            )}

            {order?.status === "ready" && (
                <Button fullWidth={true} size="small" variant="contained" color="success">Mark as complete</Button>
            )}
        </Box>
    )
}

const NoOrder = () => (
    <Typography variant="p" fontSize={14} fontWeight={500} textAlign="center">
        No Order
    </Typography>
)

const RejectTimer = ({ time, onFinish }) => {
    const rejectTimer = useTimer({
        expiryTimestamp: moment(time) + 1000 * 60 * 3,
        autoStart: true,
        onExpire: () => {
            onFinish()
        }
    })

    return (
        <span>
            {rejectTimer.minutes}:{rejectTimer.seconds}
        </span>
    )
}
