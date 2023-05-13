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
import useDebounce from "../../hook/useDebounce";
import axios from "axios";

function SearchPage() {

    const [query, setQuery] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [result, setResult] = useState()

    // const handleSearch = useCallback(
    //     debounce((url) => {
    //         // This function is debounced with a delay of 500ms
    //         return fetcher(url, undefined);
    //     }, 200),
    //     []
    // );

    const showResult = () => {
        if (query) {
            if (result) {
                return (
                    <>
                        <Box>
                            <Box
                                className="order-detail"
                                sx={{
                                    backgroundColor: "#fffffe",
                                    // boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                                    minHeight: "97.5vh",
                                    padding: "20px 20px",
                                    color: "#5F6C7B",
                                    marginTop: "30px"
                                }}>
                                <Typography variant="h5" mb={"20px"} fontFamily={"Poppins"} fontWeight={"bold"}>Menu</Typography>
                                {result.data.data.menu.map(menu => (
                                    <>
                                        <CardSearchMenu data={menu} />
                                        <Liner />
                                    </>
                                ))}
                            </Box>
                        </Box >
                        <Box>
                            <Box
                                className="order-detail"
                                sx={{
                                    backgroundColor: "#fffffe",
                                    // boxShadow: { md: "1px 1px 20px -10px rgba(109, 109, 109, 0.5)" },
                                    minHeight: "97.5vh",
                                    padding: "20px 20px",
                                    color: "#5F6C7B",
                                    paddingBottom: "120px"
                                }}>
                                <Typography variant="h5" mb={"20px"} fontFamily={"Poppins"} fontWeight={"bold"}>Tenant</Typography>
                                {result.data.data.tenant.map(tenant => (
                                    <>
                                        <CardSearchTenant data={tenant} />
                                        <Liner />
                                    </>
                                ))}
                            </Box>
                        </Box >
                    </>
                )
            } else {
                return (
                    <div>Loading...</div>
                )
            }
        } else {
            return (
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
            )
        }
    }

    const debouncedSearch = useDebounce(query, 2000)

    const url = `${BASE_URL}/search?q=${debouncedSearch}`

    useEffect(() => {
        setIsPending(false)

        async function fetchData() {
            const data = await axios.get(url, debouncedSearch)
            setResult(data)
        }

        fetchData()
    }, [debouncedSearch])

    useEffect(() => {
        if (!query) {
            setResult(undefined)
        }
    }, [query])

    const Liner = () => {
        return (
            <Box my={"30px"} sx={{ border: "1px solid #D6D6D6" }} />
        )
    }

    // const { data: search, isLoading, error } = useSWR(url, (url) => fetcher(url, undefined))

    console.log(result)

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
                {showResult()}
            </Box>
        </Container >
    )
}

export default SearchPage