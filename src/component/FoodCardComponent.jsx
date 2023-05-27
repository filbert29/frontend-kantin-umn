import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import NoImage from "../assets/No_Image_Available.jpg"

const FoodCardComponent = ({ menu, handleClick = undefined, width }) => {

    console.log(menu)

    return (
        <Box
            onClick={menu.is_available == true ? handleClick || null : null}
            className="card-food"
            sx={{
                // display: "grid",
                position: "relative",
                width: width,
                boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                cursor: menu.is_available ? "pointer" : "unset"
            }}>
                {menu.is_available == false ? 
                <Box
                sx={{
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    height: {md: "58%", xs: "59.5%"},
                    width: "100%",
                    borderRadius: "15px 15px 0px 0px"
                }}></Box> : <></>}

            <Card sx={{ maxWidth: 345, borderRadius: "15px", boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)", }}>
                <CardMedia
                    className="tenant-img"
                    component="img"
                    height="194"
                    image={menu?.image || NoImage}
                />
                <CardContent>
                    <Box sx={{
                        display: "grid",
                        // padding: "10px 15px",
                        gap: "1px"
                    }}>
                        <Typography variant="p"
                            sx={{
                                fontSize: { md: "16px", xs: "14px" },
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "left",
                                color: menu.is_available == false ? "grey" : "black"
                            }}
                        >{menu?.title}</Typography>
                        <Typography variant="p"
                            sx={{
                                fontSize: { md: "14px", xs: "12px" },
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "left",
                                color: menu.is_available == false ? "grey" : "black"
                            }}
                        >{menu?.description}</Typography>
                        <Box display={"flex"} alignItems={"center"} gap={"3px"}>
                            <Typography variant="p" fontSize={"14px"} fontWeight={"bold"}
                                sx={{ color: menu.is_available == false ? "grey" : "black" }}>Rp. {menu?.price.toLocaleString("id-ID")}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            {/* <img src={menu?.image || NoImage} alt="no image" width={"100%"} style={{ borderRadius: "15px", minHeight: "186px" }} />
            <Box sx={{
                display: "grid",
                padding: "10px 0px 10px 15px",
                gap: "1px"
            }}>
                <Typography variant="p" fontSize={"14px"} fontWeight={"bold"} sx={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{menu?.title}</Typography>
                <Typography variant="p" fontSize={"12px"} sx={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{menu?.description}</Typography>
                <Box display={"flex"} alignItems={"center"} gap={"3px"}>
                    <Typography variant="p" fontSize={"14px"} fontWeight={"bold"}>Rp. {menu?.price.toLocaleString("id-ID")}</Typography>
                </Box>
            </Box> */}
        </Box>
    );
}

export default FoodCardComponent;