import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import Loading from "../../../component/state/Loading";
import ErrorApi from "../../../component/state/ErrorApi";
import DefaultImage from "../../../assets/No_Image_Available.jpg"
import { formatThousand } from "../../../helper/number";
import { Delete, Edit } from "@mui/icons-material";

const TenantMenuPage = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: allMenu, isLoading, error } = useSWR(`${BASE_URL}/tenant/menu`, (url) => fetcher(url, access_token))

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    return (
        <>
            <Container>
                {allMenu?.length > 0 ? (
                    <Box sx={{ display: "grid", rowGap: 3 }}>
                        {allMenu.map((item) => (
                            <Card key={item?._id} sx={{ display: "flex", gap: 2, p: 1.8 }}>
                                <Box>
                                    <Box
                                        component={"img"}
                                        src={item?.image || DefaultImage}
                                        alt=""

                                        sx={{
                                            borderRadius: "10px",
                                            objectFit: "cover",
                                            minWidth: 110,
                                            minHeight: 110,
                                            width: 110,
                                            height: 110,
                                        }}
                                    />
                                    <br />
                                    <Typography textAlign={"center"} component={"p"} fontWeight={500} variant="p" fontSize={14}>Rp. {formatThousand(item?.price)}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
                                    <Box>
                                        <Typography variant="p" fontSize={13} >{item?.category?.title || "No Category"} │ {item?.prep_duration} Minutes</Typography>
                                        <Typography component="h3" fontSize={18} fontWeight={600} >{item?.title}</Typography>
                                        <Typography variant="p" sx={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: "2",
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            fontSize: 12,
                                            minHeight: "2ch"
                                        }}>{item?.description}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", columnGap: 2 }}>
                                        <Button color="error" variant="contained" size="small" endIcon={<Delete />} >
                                            Delete
                                        </Button>
                                        <Button variant="contained" size="small" endIcon={<Edit />} >
                                            Edit
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="p" textAlign={"center"}>--- No Menu ---</Typography>
                )}
            </Container>
        </>
    );
}

export default TenantMenuPage;