import { Box, Typography } from "@mui/material";
import PicFood from "../assets/pic-food.png"

const FoodCardComponent = ({ handleClickModal }) => {
    return (
        <Box
            onClick={handleClickModal}
            className="card-food"
            sx={{
                display: "grid",
                width: "23%",
                boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                cursor: "pointer"
            }}>
            <img src={PicFood} alt="" width={"100%"} />
            <Box sx={{
                display: "grid",
                padding: "10px 0px 10px 15px",
                gap: "1px"
            }}>
                <Typography variant="p" fontSize={"14px"} fontWeight={"bold"}>Nasi Goreng Kampung</Typography>
                <Typography variant="p" fontSize={"12px"}>nasi goreng dari kampung</Typography>
                <Box display={"flex"} alignItems={"center"} gap={"3px"}>
                    <Typography variant="p" fontSize={"14px"} fontWeight={"bold"}>Rp. 15.000</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default FoodCardComponent;