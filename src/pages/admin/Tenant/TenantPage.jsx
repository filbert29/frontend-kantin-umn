import BASE_URL from "../../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../../helper/fetcher";
import { IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Visibility } from "@mui/icons-material"
import { Link } from "react-router-dom";

const TenantPage = () => {
    const { data, error, isLoading } = useSWR(`${BASE_URL}/admin/tenant`, fetcher);

    if (isLoading) return
    Array(10).fill().map((_, index) => (
        <Skeleton key={index} variant="rectangular" width="100%" height={50} />
    ))

    if (error) return (
        <p>Something went wrong</p>
    )

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Tenant Name</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Orders</TableCell>
                            <TableCell>Menu</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((tenant, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{tenant?.full_name}</TableCell>
                                <TableCell>{tenant?.rating}</TableCell>
                                <TableCell>{tenant?.total_order}</TableCell>
                                <TableCell>{tenant?.total_menu}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/tenant/${tenant?._id}`}>
                                        <IconButton >
                                            <Visibility />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TenantPage;