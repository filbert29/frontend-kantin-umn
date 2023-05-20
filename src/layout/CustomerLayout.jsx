import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import { io } from "socket.io-client";
import BASE_URL from "../config/BASE_URL";
import { useDispatch, useSelector } from "react-redux";
import { mutate } from "swr";
import { addNotification } from "../store/Notification";
import { useEffect } from "react";
import browserNotification from "../helper/browserNotification";

const socket = io(BASE_URL, { transports: ["websocket"], autoConnect: false })

const CustomerLayout = () => {
    // WEBSOCKET CONFIG
    const accountData = useSelector((state) => state.auth.accountData)
    const dispatch = useDispatch()

    const connectWebsocket = () => {
        socket.connect()
        socket.emit("customer:join", accountData?._id)
    }

    const socketListener = () => {
        socket.on(`customer/update/${accountData?._id}`, (data) => {
            if (Array.isArray(data?.url)) {
                data?.url?.forEach(url => {
                    const refetchUrl = `${BASE_URL}${url}`
                    mutate(refetchUrl)
                })
            } else {
                const refetchUrl = `${BASE_URL}${data?.url}`
                mutate(refetchUrl)
            }
            browserNotification(data?.message)
            dispatch(addNotification({
                message: data?.message,
                type: data?.severity || "info"
            }))
        })
    }

    

    useEffect(() => {
        connectWebsocket()
        socketListener()
        console.log("customer layout")
        return () => {
            socket.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //END OF WEBSOCKET CONFIG


    return (
        <>
            <Outlet />
            <NavBar />
        </>
    );
}

export default CustomerLayout;