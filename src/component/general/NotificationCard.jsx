import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { removeNotification } from "../../store/Notification"
import { useEffect, useState } from "react"
import moment from "moment"

const NotificationCard = ({ message, type = "success", id }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        
        setTimeout(() => {
            dispatch(removeNotification(id))
        }, 500)
    }

    useEffect(() => {
        const remainingTime = moment(id).add(5, "second").diff(moment(), "millisecond")
        const timer = setTimeout(() => {
            handleClose()
        }, remainingTime)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Snackbar sx={{position: "static"}} open={open}>
            <Alert variant="filled" onClose={handleClose} severity={type} sx={{ minWidth: '250px' }}>
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