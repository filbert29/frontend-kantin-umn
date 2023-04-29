import { Box, Typography } from "@mui/material";
import NoImage from "../assets/No_Image_Available.jpg"

const FoodCardComponent = ({menu, handleClick = undefined }) => {
    return (
        <Box
            onClick={handleClick || null}
            className="card-food"
            sx={{
                display: "grid",
                width: "23%",
                boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                cursor: "pointer"
            }}>
                <img src={menu?.image || NoImage} alt="no image" width={"100%"} style={{ borderRadius: "15px", minHeight: "186px" }} />
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
            </Box>
        </Box>
    );
}

export default FoodCardComponent;