import { Box, Container, Typography } from "@mui/material";
import Header from "../../component/Header";
import BASE_URL from "../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher";
import CardSearchTenant from "../../component/CardSearchTenant";

const ListTenant = () => {
    const url = `${BASE_URL}/tenant`

    const { data: tenants, isLoading, error } = useSWR(url, (url) => fetcher(url, undefined))

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const title = "All Tenant"

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    return (
        <Container
            sx={{
                maxWidth: { md: "md", sm: "sm" }
            }}>
            <Box
                className="order-detail"
                sx={{
                    backgroundColor: "#fffffe",
                    boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                    minHeight: "97.5vh",
                    padding: "20px 20px",
                    color: "#5F6C7B",
                    paddingBottom: "120px"
                }}>
                <Header title={title} />
                {tenants ? tenants.map(tenant => (
                    <>
                        <CardSearchTenant data={tenant} />
                        <Liner />
                    </>
                )) : <Typography variant="h1">No Data</Typography>}
            </Box>
        </Container >
    );
}

export default ListTenant;