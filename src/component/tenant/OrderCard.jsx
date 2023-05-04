import { Box, Chip, Divider, Paper, Rating, Typography } from "@mui/material"
import { formatThousand } from "../../helper/number"
import DFlexJustifyContentBetween from "../general/DFlexJustifyContentBetween"
import ORDER_STATUS from "../../config/order-status.config"
import { useNavigate } from "react-router-dom"
import moment from "moment"

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
                {(order.status === "completed") && (
                    order?.review ? (
                        <Rating name="read-only" value={4.1} readOnly size="medium" precision={0.1} />
                    ) : (
                        <Typography component="p" variant="p" fontSize={13} fontWeight={500}>No review yet </Typography>
                    )
                )}
            </DFlexJustifyContentBetween>
        </Box>
    )
}

export default OrderCard