import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { removeNotification } from "../../store/Notification"
import { useEffect } from "react"
import moment from "moment"

const NotificationCard = ({ message, type = "success", id }) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(removeNotification(id))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeNotification(id))
        }, 3000)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={true} onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity={type} sx={{ minWidth: '200px' }}>
                <Box>
                    <Typography variant="h6" fontWeight={400} fontSize={16} >
                        {message}
                    </Typography>
                    <Typography component={"p"} fontWeight={400} fontSize={10} >
                        {moment(id).format("DD MMMM YYYY, HH:mm:ss")}
                    </Typography>
                </Box>
            </Alert>
        </Snackbar>
    )
}

export default NotificationCard