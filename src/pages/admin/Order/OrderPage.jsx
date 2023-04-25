import { Box, Chip, Divider, Modal, Rating, Typography } from "@mui/material";
import TableData from "../../../component/admin/TableData";
import { useSelector } from "react-redux";
import fetcher from "../../../helper/fetcher";
import BASE_URL from "../../../config/BASE_URL";
import useSWR from "swr";
import { useEffect, useState } from "react";
import moment from "moment";
import { ModalStyle } from "../Tenant/TenantDetailPage";

const orderColumns = [
    { id: 'number', label: '#' },
    { id: 'id', label: 'Id' },
    { id: 'items', label: 'Items' },
    { id: 'total_price', label: 'Total Price' },
    { id: 'status', label: 'Status' },
    { id: 'tenant', label: 'Tenant' },
    { id: 'customer', label: 'Customer' },
    { id: 'createdAt', label: 'Date' },
    { id: 'action', label: '' }
]

const OrderPage = () => {
    const { access_token } = useSelector((state) => state.auth?.accountData)
    const { data: allOrder, error, isLoading } = useSWR(`${BASE_URL}/admin/order`, (url) => fetcher(url, access_token));

    const [orders, setOrders] = useState()

    const [selectedOrderDetail, setSelectedOrderDetail] = useState()
    const handleCloseSelectedOrderDetail = () => {
        setSelectedOrderDetail(undefined)
    }

    useEffect(() => {
        if (allOrder) {
            const tempOrderData = allOrder?.map((order, index) => ({
                number: index + 1,
                tenant: order?.tenant?.full_name,
                customer: order?.customer?.full_name,
                id: order?._id,
                items: order?.items?.map((item) => item?.menu?.title).join(", "),
                total_price: "Rp" + (order?.total_price).toLocaleString("id-ID"),
                status: order?.status,
                createdAt: moment(order?.createdAt).format("DD MMMM YYYY HH:mm"),
                action: {
                    handleDetail: () => setSelectedOrderDetail(order)
                }
            }))
            setOrders(tempOrderData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allOrder])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    return (
        <>
            <Box>
                <TableData
                    title={"Orders"}
                    columns={orderColumns}
                    data={orders}
                    searchField={[
                        { id: 'tenant', label: 'Tenant Name' },
                        { id: 'customer', label: 'Customer Name' },
                        { id: 'id', label: 'Order Id' },
                    ]}
                />
            </Box>
            {selectedOrderDetail && (
                <ModaOrderDetail
                    open={Boolean(selectedOrderDetail)}
                    handleClose={handleCloseSelectedOrderDetail}
                    order={selectedOrderDetail}
                />
            )}
        </>
    );
}

export default OrderPage;

const ModaOrderDetail = ({ open, handleClose, order }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={ModalStyle}>
                <Typography variant="h5" component="h1">
                    Order Detail
                    <Chip sx={{ ml: 2 }} color="info" variant="" label={order?.status} />
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="p" component="p">
                        {order?._id}
                    </Typography>
                    <Typography variant="p" component="p">
                        {moment(order?.createdAt).format("DD-MMMM-YYYY HH:mm")}
                    </Typography>
                </Box>
                <Typography mb={1} variant="p" component="p">
                    Tenant: {order?.tenant?.full_name}
                </Typography>
                <Typography variant="h6" component="p">
                    Progress
                </Typography>

                {Object.entries(order?.progress || {}).map(([key, value]) => (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="p" component="p">
                            {key}
                        </Typography>
                        <Typography variant="p" component="p">
                            {value ? moment(value).format("DD-MMMM-YYYY HH:mm") : "-"}
                        </Typography>
                    </Box>
                ))}

                <Typography mt={2} variant="h6" component="p">
                    Items
                </Typography>
                {order?.items?.map((item) => (
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="p" component="p">
                                {item?.menu?.title}
                            </Typography>
                            <Typography variant="p" component="p">
                                x {item?.quantity}
                            </Typography>
                        </Box>
                        <Typography variant="p" component="p" textAlign={"right"}>
                            Rp{(item?.price) * (item?.quantity).toLocaleString("id-ID")}
                        </Typography>
                    </Box>
                ))}
                <Typography mt={1} textAlign={"right"} variant="h6" component="p">
                    Total Price: Rp{(order?.total_price).toLocaleString("id-ID")}
                </Typography>
                {order?.review && (
                    <Box mt={2}>
                        <Typography variant="h6" component="p">
                            Review
                        </Typography>
                        <Rating
                            readOnly
                            value={order?.review?.rating}
                        />
                        <Typography variant="p" component="p">
                            {order?.review?.content}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}