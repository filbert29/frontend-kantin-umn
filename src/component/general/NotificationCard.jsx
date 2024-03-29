import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { removeNotification } from "../../store/Notification"
import { useEffect, useState } from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"

const NotificationCard = ({ message, type = "success", id, navigateTo }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

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
        <Snackbar sx={{ position: "static" }} open={open}>
            <Alert variant="filled" onClose={handleClose} severity={type} sx={{ minWidth: '250px', maxWidth: "339px" }}>
                <Box onClick={() => { if (navigateTo !== undefined) { navigate(navigateTo) } }}>
                    <Typography variant="h6" fontWeight={400} fontSize={16} marginBottom={1} >
                        {message}
                    </Typography>
                    <Typography component={"p"} fontWeight={400} fontSize={12} >
                        {moment(id).format("DD MMMM YYYY, HH:mm:ss")}
                    </Typography>
                </Box>
            </Alert>
        </Snackbar>
    )
}

export default NotificationCard