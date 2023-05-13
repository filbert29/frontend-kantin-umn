import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Container, Divider, Grid, Rating, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import { useSelector } from "react-redux";
import Loading from "../../../component/state/loading";
import ErrorApi from "../../../component/state/ErrorApi";
import { AccessTime, ArrowBackIos, Cached, Cancel, Done, ExpandMore, LocalDining } from "@mui/icons-material";
import { useState } from "react";
import moment from "moment";
import ORDER_STATUS from "../../../config/order-status.config";
import DFlexJustifyContentBetween from "../../../component/general/DFlexJustifyContentBetween";
import LabelValue from "../../../component/admin/LabelValue";
import { formatThousand } from "../../../helper/number";
import axios from "axios";
import ActionTimer from "../../../component/general/ActionTimer";
import ItemCard from "../../../component/tenant/ItemCard";

const TenantOrderDetailPage = () => {
    const { id } = useParams();
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: order, isLoading, error, mutate } = useSWR(`${BASE_URL}/order/${id}`, (url) => fetcher(url, access_token))

    const [isMobile] = useState(window.matchMedia("(max-width: 500px)").matches)

    const [loading, setLoading] = useState({ action: undefined, state: false })
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

    const navigate = useNavigate()

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    return (
        <Container>
            <Button sx={{ color: "black" }} startIcon={<ArrowBackIos />} onClick={() => navigate(-1)}>
                Back to order history
            </Button>

            <OrderProgress order={order} isMobile={isMobile} />

            <Grid container spacing={1} sx={{ mt: 0 }}>
                <LabelValue
                    labelSize={4.2}
                    valueSize={7.8}
                    label="Customer"
                    value={order?.customer?.full_name}
                    valueSx={{ textAlign: "right" }}
                />
                <LabelValue
                    labelSize={4.2}
                    valueSize={7.8}
                    label="Order Date"
                    value={moment(order?.progress?.created).format("llll")}
                    valueSx={{ textAlign: "right" }}
                />
                <LabelValue
                    labelSize={4.2}
                    valueSize={7.8}
                    label="Order ID"
                    value={order?._id}
                    valueSx={{ textAlign: "right" }}
                />
                <LabelValue
                    labelSize={4.2}
                    valueSize={7.8}
                    label="Prep Duration"
                    value={`${order?.total_prep_duration} minutes (estimated)`}
                    valueSx={{ textAlign: "right" }}
                />
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6" component="h6" fontWeight="bold">
                    Order Detail
                </Typography>
            </Box>
            <Box sx={{ mt: 0, display: "grid", rowGap: 3 }}>
                {order?.items?.map((item) => (
                    <ItemCard key={item?.menu?.id} item={item} />
                ))}
                <DFlexJustifyContentBetween>
                    <Typography variant="h6" fontSize={18} fontWeight="bold">
                        Sub Total
                    </Typography>
                    <Typography variant="h6" fontSize={18} fontWeight="bold">
                        Rp. {formatThousand(order?.total_price)}
                    </Typography>
                </DFlexJustifyContentBetween>
                <Divider sx={{ my: 0 }} />
                <Box>
                    {order?.status === "created" && (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                onClick={() => handleAction("reject")}
                                sx={{ width: "30%" }}
                                size="large"
                                variant="contained"
                                color="error"
                                disabled={loading.state}
                            >
                                {loading.state && loading.action === "reject" ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Reject"}
                            </Button>
                            <Button
                                onClick={() => handleAction("confirm")}
                                sx={{ width: "70%" }}
                                size="large"
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
                            size="large"
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
                            size="large"
                            variant="contained"
                            color="success"
                            disabled={loading.state}
                        >
                            {loading.state ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Mark as complete"}
                        </Button>
                    )}
                    {(order.status === "completed") && (
                        order?.review ? (
                            <>
                            <DFlexJustifyContentBetween>
                                <Rating name="read-only" value={order?.review?.rating} readOnly size="medium" precision={0.1} />
                                <Typography component="p" variant="p" >
                                    {moment(order?.review?.createdAt).format("llll")}
                                </Typography>
                            </DFlexJustifyContentBetween>
                                <Typography component="p" variant="p" mt={2} >
                                    "{order?.review?.content}"
                                </Typography>
                            </>
                        ) : (
                            <Typography component="h6" variant="h6" fontSize={18} fontWeight={500}>No review yet </Typography>
                        )
                    )}
                </Box>
            </Box>
        </Container >
    );
}

export default TenantOrderDetailPage;

const OrderProgress = ({ order, isMobile }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Accordion sx={{ boxShadow: "none", p: 0 }}>
                <AccordionSummary sx={{ p: 0 }} expandIcon={<ExpandMore />}>
                    <DFlexJustifyContentBetween sx={{ width: "100%" }}>
                        <Typography component="h6" fontSize={20} fontWeight={"bold"}>
                            {ORDER_STATUS[order?.status].label}
                        </Typography>
                        <Typography component="p" variant="p">
                            See Detail
                        </Typography>
                    </DFlexJustifyContentBetween>
                </AccordionSummary>
                <AccordionDetails>
                    <Stepper orientation={isMobile ? "vertical" : "horizontal"} alternativeLabel={!isMobile}>
                        <Step completed={!!(order?.progress?.created)}>
                            <StepLabel
                                StepIconProps={{ sx: { color: !!(order?.progress?.created) ? "#1976d2" : "gray" } }}
                                StepIconComponent={AccessTime}
                            >
                                Pending {isMobile ? "-" : <br />} {order?.progress.created && (
                                    moment(order?.progress?.created).format("DD MMM YYYY HH:mm")
                                )}
                            </StepLabel>
                        </Step>
                        <Step completed={!!(order?.progress?.preparing)}>
                            <StepLabel
                                StepIconProps={{ sx: { color: !!(order?.progress?.preparing) ? "#1976d2" : "gray" } }}
                                StepIconComponent={Cached}
                            >
                                On Progress {isMobile ? "-" : <br />} {order?.progress.preparing && (
                                    moment(order?.progress?.preparing).format("DD MMM YYYY HH:mm")
                                )}
                            </StepLabel>
                        </Step>
                        <Step completed={!!order?.progress?.ready}>
                            <StepLabel
                                StepIconProps={{ sx: { color: !!(order?.progress?.ready) ? "#1976d2" : "gray" } }}
                                StepIconComponent={LocalDining}
                            >
                                <Typography variant="" sx={{ color: "gray" }}>
                                    Ready to Pickup {isMobile ? "-" : <br />} {order?.progress.ready && (
                                        moment(order?.progress?.ready).format("DD MMM YYYY HH:mm")
                                    )}
                                </Typography>
                            </StepLabel>
                        </Step>
                        <Step completed={!!order?.progress?.completed}>
                            <StepLabel
                                StepIconProps={{ sx: { color: !!(order?.progress?.completed) ? "#1976d2" : "gray" } }}
                                StepIconComponent={Done}
                            >
                                Completed {isMobile ? "-" : <br />} {order?.progress.completed && (
                                    moment(order?.progress?.completed).format("DD MMM YYYY HH:mm")
                                )}
                            </StepLabel>
                        </Step>
                        {order?.status === "rejected" && (
                            <Step completed={!!order?.progress?.rejected}>
                                <StepLabel
                                    StepIconProps={{ sx: { color: "red" } }}
                                    StepIconComponent={Cancel}
                                    error={true}
                                >
                                    Rejected {isMobile ? "-" : <br />} {order?.progress.rejected && (
                                        moment(order?.progress?.rejected).format("DD MMM YYYY HH:mm")
                                    )}
                                </StepLabel>
                            </Step>
                        )}
                    </Stepper>
                </AccordionDetails>
            </Accordion>

        </Box>
    )
}