import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material"
import ActionTimer from "../general/ActionTimer"
import DFlexJustifyContentBetween from "../general/DFlexJustifyContentBetween"
import { formatThousand } from "../../helper/number"
import axios from "axios"
import BASE_URL from "../../config/BASE_URL"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import ORDER_STATUS from "../../config/order-status.config"
import { addNotification } from "../../store/Notification"

const OnProgressOrderCard = ({ order, index, mutate = undefined }) => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const [loading, setLoading] = useState({ action: undefined, state: false })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAction = async (action) => {
        setLoading({ action: action, state: true })
        try {
            await axios.patch(`${BASE_URL}/order/${action}/${order?._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            dispatch(addNotification({
                message: `Berhasil mengubah status pesanan: ${ORDER_STATUS[action].label}`,
                type: "success"
            }))
        } catch (error) {
            dispatch(addNotification({
                message: `Gagal mengubah status pesanan: ${ORDER_STATUS[action].label}`,
                type: "error"
            }))
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
                        {order?._id}
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
                        <Typography variant="p" fontSize={14} fontWeight={600}>Durasi Persiapan</Typography>
                        <Typography variant="p" fontSize={14} fontWeight={600}>{order?.total_prep_duration} Menit</Typography>
                    </DFlexJustifyContentBetween>
                    {order?.waiting_time !== undefined && (
                        <DFlexJustifyContentBetween sx={{ mt: 1 }}>
                            <Typography variant="p" fontSize={14} fontWeight={600}>Waktu Tunggu</Typography>
                            <Typography variant="p" fontSize={14} fontWeight={600}>{Math.floor(order?.waiting_time / 60 / 1000)} Menit</Typography>
                        </DFlexJustifyContentBetween>
                    )}
                    {order?.turnaround_time !== undefined && (
                        <DFlexJustifyContentBetween sx={{ mt: 1 }}>
                            <Typography variant="p" fontSize={14} fontWeight={600}>Waktu Penyelesaian</Typography>
                            <Typography variant="p" fontSize={14} fontWeight={600}>{Math.floor(order?.turnaround_time / 60 / 1000)} Menit</Typography>
                        </DFlexJustifyContentBetween>
                    )}
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
                        {loading.state && loading.action === "reject" ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Tolak"}
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
                                Terima &nbsp; <ActionTimer time={order?.progress?.created} onFinish={() => { mutate() }} />
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
                    {loading.state ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Siap diambil"}
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
                    {loading.state ? <CircularProgress sx={{ color: "white" }} size={20} /> : "Selesai"}
                </Button>
            )}
        </Box>
    )
}

export default OnProgressOrderCard