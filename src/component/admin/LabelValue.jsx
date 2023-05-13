import { Box, Grid, Typography } from "@mui/material";

const LabelValue = ({ labelSize = 3, valueSize = 9, label, value, fontSize, labelSx = {}, valueSx = {} }) => {
    return (
        <>
            <Grid item xs={labelSize}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="p" component="p" sx={{ ...labelSx, fontSize: fontSize || "initial" }}>
                        {label}
                    </Typography>
                    <Box>:</Box>
                </Box>
            </Grid>
            <Grid item xs={valueSize}>
                <Typography variant="p" component="p" sx={{ ...valueSx, fontSize: fontSize || "initial" }}>
                    {value}
                </Typography>
            </Grid>
        </>
    );
}

export default LabelValue;