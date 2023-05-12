import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SearchIcon from "../../assets/icons8-search-32.png";
import Arrow from "../../assets/arrow-alltenant.png"

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BASE_URL from "../../config/BASE_URL";
import useSWR from 'swr'
import fetcher from "../../helper/fetcher"
import { debounce } from "lodash";
import Header from "../../component/Header";
import CardSearchTenant from "../../component/CardSearchTenant";
import CardSearchMenu from "../../component/CardSearchMenu";

function SearchPage() {

    const [query, setQuery] = useState("")
    const [isPending, setIsPending] = useState(false)

    const handleSearch = useCallback(
        debounce((url) => {
            // This function is debounced with a delay of 500ms
            return fetcher(url, undefined);
        }, 200),
        []
    );

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    const url = `${BASE_URL}/search?q=${query}`

    const { data: search, isLoading, error } = useSWR(url, (url) => handleSearch(url))

    console.log(search)

    return (
        <Container
            sx={{
                maxWidth: { md: "md", sm: "md" }
            }}>
            <Box
                sx={{
                    backgroundColor: "#fffffe",
                    boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                    minHeight: "97.5vh",
                    paddingTop: "20px",
                    color: "#5F6C7B"
                }}>
                <Box
                    className="search-box"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "18px 0px 18px 35px",
                        margin: { md: "0px 50px", xs: "0px 20px" },
                        borderRadius: "40px",
                        boxShadow: "1px 1px 30px -1px rgba(109, 109, 109, 0.5)",
                        textDecoration: "none"
                    }}>
                    <img src={SearchIcon} width={"35px"} alt="" />
                    <TextField autoFocus
                        className="search-page"
                        placeholder="Cari di Kantin UMN"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}></TextField>
                </Box>

                {search ? <Box>
                    <Box
                        className="order-detail"
                        sx={{
                            backgroundColor: "#fffffe",
                            // boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                            minHeight: "97.5vh",
                            padding: "20px 20px",
                            color: "#5F6C7B",
                            paddingBottom: "120px",
                            marginTop: "30px"
                        }}>
                        {search?.menu ? search.menu.map(menu => (
                            <>
                                <CardSearchMenu data={menu} />
                                <Liner />
                            </>
                        )) : <Typography variant="h1">No Data</Typography>}
                    </Box>
                </Box > : <div>Loading...</div>}

                <Box component={Link} to={"/customer/search/listtenant"}
                    sx={{
                        padding: { md: "38px 0px 20px 50px", xs: "38px 0px 20px 20px" },
                        margin: { md: "0px 40px", xs: "0px 20px" },
                        fontSize: "18px",
                        borderBottom: "1px black solid",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#5F6C7B"
                    }}>
                    <Typography variant="p">All Tenant</Typography>
                    <img src={Arrow} alt="" width={"20px"} style={{ marginLeft: "auto", marginRight: "5%" }} />
                </Box>
            </Box>
        </Container >
    )
}

export default SearchPage