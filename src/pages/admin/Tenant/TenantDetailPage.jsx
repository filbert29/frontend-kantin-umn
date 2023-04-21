import { ArrowBack, LocationOn } from "@mui/icons-material";
import { Box, Button, Typography, Divider, Modal } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../../config/BASE_URL";
import useSWR from "swr";
import fetcher from "../../../helper/fetcher";
import DefaulltImage from "./../../../assets/default.jpg"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableData from "../../../component/Admin/TableData";

const menuColumns = [
    { id: "number", label: "#" },
    { id: "title", label: "Title" },
    { id: "price", label: "Price" },
    { id: "description", label: "Description" },
    { id: "category", label: "Category" },
    { id: "action", label: "" },
]

const TenantDetailPage = () => {
    const id = useParams().id;
    const { access_token } = useSelector((state) => state.auth?.accountData)
    const { data, error, isLoading } = useSWR(`${BASE_URL}/admin/tenant/${id}`, (url) => fetcher(url, access_token));
    const [menus, setMenus] = useState();

    // MODAL MENU DETAIL
    const [openModalMenuDetail, setOpenModalMenuDetail] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState();

    const handleCloseModalMenuDetail = () => {
        setOpenModalMenuDetail(false);
    };

    useEffect(() => {
        if (data?.menus) {
            const tempTenantMenus = data?.menus?.map((menu, index) => ({
                number: index + 1,
                title: menu?.title,
                price: menu?.price,
                description: menu?.description,
                category: menu?.category?.title || "No Category",
                action: (
                    <Button onClick={() => {
                        setOpenModalMenuDetail(true)
                        setSelectedMenu(menu)
                    }}> Detail </Button>
                )
            }))
            setMenus(tempTenantMenus)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;


    return (
        <div>
            <Link to={"/admin/tenant"}>
                <Button startIcon={<ArrowBack />}>
                    Back to Tenant
                </Button>
            </Link>
            <Box mt={4}>
                <Box textAlign={"center"} >
                    <img width={"300px"} alt={data?.full_name} src={data?.profile_image || DefaulltImage}></img>
                </Box>
                <Typography variant="h4" component="h1" textAlign={"center"}>
                    {data?.full_name}
                </Typography>
                <Typography variant="p" component="p" textAlign={"center"}>
                    {data?.description}
                </Typography>
                <Typography variant="p" component="p" textAlign={"center"}>
                    <LocationOn fontSize="12px" /> {data?.location}
                </Typography>
                <Box mt={4}>
                    <Typography variant="h5" component="h1">
                        Menu
                    </Typography>
                    <Divider />
                    <TableData
                        columns={menuColumns}
                        data={menus}
                    />
                </Box>
            </Box>

            <ModalMenuDetail
                open={openModalMenuDetail}
                handleClose={handleCloseModalMenuDetail}
                menu={selectedMenu}
            />
        </div>
    );
}

export default TenantDetailPage;

const ModalMenuDetailStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalMenuDetail = ({ open, handleClose, menu }) => {
    const { title, price, description, category, image } = menu || {};
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={ModalMenuDetailStyle}>
                <img width={"100%"} height={"400px"} style={{objectFit: "cover"}} alt={title} src={image || DefaulltImage}></img>
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