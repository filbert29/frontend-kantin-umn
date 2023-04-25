import { Box, Grid, Typography } from "@mui/material";

const LabelValue = ({ labelSize = 3, valueSize = 9, label, value, fontSize }) => {
    return (
        <>
            <Grid item xs={labelSize} sx={{fontSize: fontSize || "initial"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="p" component="p">
                        {label}
                    </Typography>
                    <Box>:</Box>
                </Box>
            </Grid>
            <Grid item xs={valueSize} sx={{fontSize: fontSize || "initial"}}>
                <Typography variant="p" component="p">
                    {value}
                </Typography>
            </Grid>
        </>
    );
}

export default LabelValue;