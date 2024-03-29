import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Grid, Modal, Rating, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import DefaultImage from "./../../../assets/default.jpg"
import moment from "moment";
import TableData from "../../../component/admin/TableData";
import { useEffect, useState } from "react";
import { ModalStyle } from "../Tenant/TenantDetailPage";
import LabelValue from "../../../component/admin/LabelValue";

const orderColumns = [
    { id: 'number', label: '#', minWidth: 0 },
    { id: 'id', label: 'Id' },
    { id: 'items', label: 'Items' },
    { id: 'total_price', label: 'Total Price' },
    { id: 'status', label: 'Status' },
    { id: 'tenant', label: 'Tenant' },
    { id: 'createdAt', label: 'Date' },
    { id: 'action', label: '' }
]

const CustomerDetailPage = () => {
    const id = useParams().id;
    const { access_token } = useSelector((state) => state.auth?.accountData)
    const { data, error, isLoading } = useSWR(`${BASE_URL}/admin/customer/${id}`, (url) => fetcher(url, access_token));

    const [orders, setOrders] = useState()

    const [selectedOrderDetail, setSelectedOrderDetail] = useState()
    const handleCloseSelectedOrderDetail = () => {
        setSelectedOrderDetail(undefined)
    }

    useEffect(() => {
        if (data?.orders) {
            const tempOrderData = data?.orders?.map((order, index) => ({
                number: index + 1,
                tenant: order?.tenant?.full_name,
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
    }, [data?.orders])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    return (
        <Box>
            <Link to={"/admin/customer"}>
                <Button startIcon={<ArrowBack />}>
                    Back to Customer
                </Button>
            </Link>
            <Box mt={4}>
                <Box mt={4} sx={{ display: "flex", columnGap: 4 }} >
                    <Box >
                        <img width={"400px"} alt={data?.full_name} src={data?.profile_image || DefaultImage}></img>
                    </Box>
                    <Box>
                        <Grid container spacing={1}>
                            <LabelValue fontSize={20} label={"Id"} value={data?._id} />
                            <LabelValue fontSize={20} label={"Full Name"} value={data?.full_name} />
                            <LabelValue fontSize={20} label={"Email"} value={data?.email} />
                            <LabelValue fontSize={20} label={"Joined"} value={moment(data?.createdAt).format("DD MMMM YYYY")} />
                        </Grid>
                    </Box>
                </Box>
                <Box mt={4}>
                    <TableData
                        title={"Orders"}
                        columns={orderColumns}
                        data={orders}
                        searchField={[
                            { id: 'tenant', label: 'Tenant Name' },
                            { id: 'id', label: 'Order Id' },
                        ]}
                    />
                </Box>
            </Box>
            <ModaOrderDetail
                open={selectedOrderDetail !== undefined}
                handleClose={handleCloseSelectedOrderDetail}
                order={selectedOrderDetail}
            />
        </Box>
    );
}

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
                    Total Price: {order?.total_price}
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

export default CustomerDetailPage;