import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography, Divider, Modal, Chip, Rating, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../../config/BASE_URL";
import useSWR from "swr";
import fetcher from "../../../helper/fetcher";
import DefaultImage from "./../../../assets/default.jpg"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableData from "../../../component/admin/TableData";
import moment from "moment/moment";
import LabelValue from "../../../component/admin/LabelValue";

const menuColumns = [
    { id: "number", label: "#" },
    { id: "id", label: "Id" },
    { id: "title", label: "Title" },
    { id: "price", label: "Price" },
    { id: "description", label: "Description" },
    { id: "category", label: "Category" },
    { id: "action", label: "" },
]

const orderColumns = [
    { id: "number", label: "#" },
    { id: "id", label: "Id" },
    { id: "total_price", label: "Total Price" },
    { id: "quantity", label: "Quantity" },
    { id: "status", label: "Status" },
    { id: "items", label: "Items" },
    { id: "customer", label: "Customer" },
    { id: "action", label: "" },
]

const TenantDetailPage = () => {
    const id = useParams().id;
    const { access_token } = useSelector((state) => state.auth?.accountData)
    const { data, error, isLoading } = useSWR(`${BASE_URL}/admin/tenant/${id}`, (url) => fetcher(url, access_token));

    const [menus, setMenus] = useState();
    const [orders, setOrders] = useState();

    // MODAL MENU DETAIL
    const [openModalMenuDetail, setOpenModalMenuDetail] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState();

    // MODAL ORDER DETAIL
    const [openModalOrderDetail, setOpenModalOrderDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState();

    const handleCloseModalMenuDetail = () => {
        setOpenModalMenuDetail(false);
    };

    const handleCloseModalOrderDetail = () => {
        setOpenModalOrderDetail(false);
    };

    useEffect(() => {
        if (data?.menus) {
            const tempTenantMenus = data?.menus?.map((menu, index) => ({
                number: index + 1,
                id: menu?._id,
                title: menu?.title,
                price: menu?.price,
                description: menu?.description,
                category: menu?.category?.title || "No Category",
                action: {
                    handleDetail: () => {
                        setOpenModalMenuDetail(true)
                        setSelectedMenu(menu)
                    }
                }
            }))
            setMenus(tempTenantMenus)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.menus])

    useEffect(() => {
        if (data?.orders) {
            const tempTenantOrders = data?.orders?.map((order, index) => ({
                number: index + 1,
                id: order?._id,
                total_price: "Rp" + (order?.total_price).toLocaleString("id-ID"),
                quantity: (order?.items)?.reduce(((acc, item) => acc + item?.quantity), 0),
                status: order?.status,
                items: order?.items?.map((item) => item?.menu?.title).join(", "),
                customer: order?.customer?.full_name,
                action: {
                    handleDetail: () => {
                        setOpenModalOrderDetail(true)
                        setSelectedOrder(order)
                    }
                }
            }))

            setOrders(tempTenantOrders)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.orders])


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;


    return (
        <div>
            <Link to={"/admin/tenant"}>
                <Button startIcon={<ArrowBack />}>
                    Back to Tenant
                </Button>
            </Link>
            <Box mt={4} sx={{ display: "flex", columnGap: 4 }} >
                <Box >
                    <img width={"400px"} alt={data?.full_name} src={data?.profile_image || DefaultImage}></img>
                </Box>
                <Box>
                    <Grid container spacing={1}>
                        <LabelValue fontSize={20} label={"Id"} value={data?._id} />
                        <LabelValue fontSize={20} label={"Tenant Name"} value={data?.full_name} />
                        <LabelValue fontSize={20} label={"Description"} value={data?.description} />
                        <LabelValue fontSize={20} label={"Location"} value={data?.location} />
                        <LabelValue fontSize={20} label={"Email"} value={data?.email} />
                    </Grid>
                </Box>
            </Box>
            <Box mt={4}>
                <Box mt={4}>
                    <TableData
                        title={"Menus"}
                        columns={menuColumns}
                        data={menus}
                        searchField={[
                            { id: "title", label: "Title" },
                            { id: "description", label: "Description" },
                            { id: "id", label: "Menu Id" },
                        ]}
                    />
                </Box>
                <Box mt={4}>
                    <TableData
                        title={"Orders"}
                        columns={orderColumns}
                        data={orders}
                        searchField={[
                            { id: "customer", label: "Customer" },
                            { id: "id", label: "Menu Id" },
                        ]}
                    />
                </Box>
            </Box>

            <ModalMenuDetail
                open={openModalMenuDetail}
                handleClose={handleCloseModalMenuDetail}
                menu={selectedMenu}
            />

            <ModaOrderDetail
                open={openModalOrderDetail}
                handleClose={handleCloseModalOrderDetail}
                order={selectedOrder}
            />
        </div>
    );
}

export default TenantDetailPage;

export const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const ModalMenuDetail = ({ open, handleClose, menu }) => {
    const { title, price, description, category, image } = menu || {};
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={ModalStyle}>
                <img width={"100%"} height={"400px"} style={{ objectFit: "cover" }} alt={title} src={image || DefaultImage}></img>
                <Typography mt={1} variant="h5" component="h1">
                    {title}
                </Typography>
                <Typography variant="p" component="p">
                    {category?.title || "No Category"}
                </Typography>
                <Typography my={1} variant="p" component="p">
                    {price}
                </Typography>
                <Typography variant="p" component="p">
                    {description}
                </Typography>
            </Box>
        </Modal>
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
                    Customer: {order?.customer?.full_name}
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