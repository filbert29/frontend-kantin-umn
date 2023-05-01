import { Box } from "@mui/material";

const DFlexJustifyContentBetween = ({children, sx = {}}) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...sx }}>
            {children}
        </Box>
    );
}

export default DFlexJustifyContentBetween;