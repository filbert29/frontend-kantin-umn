import { Box, Card, Paper, Typography } from '@mui/material'
import React from 'react'
import { formatThousand } from '../../helper/number'
import DefaultImage from "../../assets/No_Image_Available.jpg";

const ItemCard = ({item}) => {
    return (
        <Card
            component={Paper}
            sx={{ borderRadius: "10px", display: "flex", p: 1.5, columnGap: 2 }}
        >
            <Box
                component={"img"}
                src={item?.menu?.image || DefaultImage}
                sx={{ objectFit: "cover", borderRadius: "10px" }}
                width={112}
                height={112}
                alt={item?.menu?.title}
            />
            <Box display={"Flex"} justifyContent={"space-between"} flexDirection={"column"}>
                <Box>
                    <Typography variant="h6" fontSize={16} fontWeight={500}>
                        {item?.menu?.title}
                    </Typography>
                    <Typography variant="h6" fontSize={16} fontWeight={500}>
                        x {item?.quantity}
                    </Typography>
                </Box>
                <Typography variant="h6" fontSize={16} fontWeight={500}>
                    Rp. {formatThousand(item?.price * item?.quantity)}
                </Typography>
            </Box>
        </Card>
    )
}

export default ItemCard