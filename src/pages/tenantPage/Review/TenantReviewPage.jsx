import { Star } from "@mui/icons-material";
import { Box, Chip, Container, Rating, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import BASE_URL from "../../../config/BASE_URL";
import fetcher from "../../../helper/fetcher";
import { useSelector } from "react-redux";
import Loading from "../../../component/state/Loading";
import ErrorApi from "../../../component/state/ErrorApi";
import moment from "moment";

const RatingSummaryStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "300px",
}

const TenantReviewPage = () => {
    const { access_token } = useSelector((state) => state.auth.accountData)
    const { data: reviewData, isLoading, error } = useSWR(`${BASE_URL}/tenant/review`, (url) => fetcher(url, access_token))
    const [activeFilter, setActiveFilter] = useState("all")

    if (isLoading) return <Loading />
    if (error) return <ErrorApi />

    const showReviews = () => {
        if (reviewData?.reviews?.length > 0) {
            const allReview = reviewData?.reviews?.filter((item) => activeFilter === "all" ? item : item?.rating === Number(activeFilter))
            if (allReview?.length > 0) {
                return (
                    allReview.map((item) => (
                        <ReviewCard review={item} key={item?._id} />

                    ))
                )
            } else {
                return <Typography variant="p" textAlign={"center"}>--- Tidak Ada Penilaian ---</Typography>
            }
        } else {
            return <Typography variant="p" textAlign={"center"}>--- Tidak Ada Penilaian ---</Typography>
        }
    }

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box >
                    <Typography sx={RatingSummaryStyles} variant="h6"><Rating size="large" value={5} readOnly /> {reviewData?.total_5_rating || 0} </Typography>
                    <Typography sx={RatingSummaryStyles} variant="h6"><Rating size="large" value={4} readOnly /> {reviewData?.total_4_rating || 0} </Typography>
                    <Typography sx={RatingSummaryStyles} variant="h6"><Rating size="large" value={3} readOnly /> {reviewData?.total_3_rating || 0} </Typography>
                    <Typography sx={RatingSummaryStyles} variant="h6"><Rating size="large" value={2} readOnly /> {reviewData?.total_2_rating || 0} </Typography>
                    <Typography sx={RatingSummaryStyles} variant="h6"><Rating size="large" value={1} readOnly /> {reviewData?.total_1_rating || 0} </Typography>
                </Box>
            </Box>
            <Box sx={{ my: 4 }}>
                <Typography variant="h6">Total Penilaian : {reviewData?.total_review}</Typography>
                <Typography variant="h6">Rata-rata : {reviewData?.average_rating}</Typography>
            </Box>
            <Box sx={{ display: "flex", py: 2, gap: 2, overflowX: "auto", mb: 2 }}>
                <Chip variant={activeFilter === "all" ? "filled" : "outlined"} onClick={() => setActiveFilter("all")} sx={{ px: 1 }} label="All" />
                <Chip variant={activeFilter === "5" ? "filled" : "outlined"} onClick={() => setActiveFilter("5")} sx={{ px: 1 }} icon={<Star sx={{ color: "#faaf00 !important" }} />} label="5" />
                <Chip variant={activeFilter === "4" ? "filled" : "outlined"} onClick={() => setActiveFilter("4")} sx={{ px: 1 }} icon={<Star sx={{ color: "#faaf00 !important" }} />} label="4" />
                <Chip variant={activeFilter === "3" ? "filled" : "outlined"} onClick={() => setActiveFilter("3")} sx={{ px: 1 }} icon={<Star sx={{ color: "#faaf00 !important" }} />} label="3" />
                <Chip variant={activeFilter === "2" ? "filled" : "outlined"} onClick={() => setActiveFilter("2")} sx={{ px: 1 }} icon={<Star sx={{ color: "#faaf00 !important" }} />} label="2" />
                <Chip variant={activeFilter === "1" ? "filled" : "outlined"} onClick={() => setActiveFilter("1")} sx={{ px: 1 }} icon={<Star sx={{ color: "#faaf00 !important" }} />} label="1" />
            </Box>

            <Box sx={{ display: "grid", rowGap: 3 }}>
                {showReviews()}
            </Box>
        </Container>
    );
}

export default TenantReviewPage;

const ReviewCard = ({ review }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2, border: "1px solid #ccc", borderRadius: "5px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography fontSize={16} variant="h6">{review?.customer?.full_name}</Typography>
                    <Rating size="small" value={review?.rating} readOnly />
                </Box>
                <Typography variant="body2">{moment(review?.createdAt).format("lll")}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body2">"{review?.content}"</Typography>
            </Box>
        </Box>
    )
}   