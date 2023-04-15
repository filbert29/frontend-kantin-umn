import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";

const CustomerLayout = () => {
    return (
        <>
            <Outlet />
            <NavBar />
        </>
    );
}

export default CustomerLayout;