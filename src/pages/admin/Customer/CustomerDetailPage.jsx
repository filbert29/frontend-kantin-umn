import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import DefaultImage from "./../../../assets/default.jpg"

const CustomerDetailPage = () => {
    const id = useParams().id;
    const { access_token } = useSelector((state) => state.auth?.accountData)
    const { data, error, isLoading } = useSWR(`${BASE_URL}/admin/customer/${id}`, (url) => fetcher(url, access_token));

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    return (
        <Box>
            <Link to={"/admin/tenant"}>
                <Button startIcon={<ArrowBack />}>
                    Back to Customer
                </Button>
            </Link>
            <Box mt={4}>
                <Box textAlign={"center"} >
                    <img width={"300px"} alt={data?.full_name} src={data?.profile_image || DefaultImage}></img>
                </Box>
                <Typography variant="h4" component="h1" textAlign={"center"}>
                    {data?.full_name}
                </Typography>
                <Typography variant="p" component="p" textAlign={"center"}>
                    {data?.email}
                </Typography>
                <Typography variant="p" component="p" textAlign={"center"}>
                    Joined since{}
                </Typography>
                {/* <Box mt={4}>
                    <Typography variant="h5" component="h1">
                        Menu
                    </Typography>
                    <Divider />
                    <TableData
                        columns={menuColumns}
                        data={menus}
                    />
                </Box>
                <Box mt={4}>
                    <Typography variant="h5" component="h1">
                        Orders
                    </Typography>
                    <Divider />
                    <TableData
                        columns={orderColumns}
                        data={orders}
                    />
                </Box> */}
            </Box>
        </Box>
    );
}

export default CustomerDetailPage;