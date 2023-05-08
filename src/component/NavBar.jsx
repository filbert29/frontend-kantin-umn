import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/style/styleNavbar.css"

const NavBar = ({ navbar }) => {
    const [value, setValue] = useState(0);

    const goHome = useNavigate()

    const location = useLocation()

    const refHome = useRef(null)
    const refSearch = useRef(null)
    const refHistory = useRef(null)
    const refCart = useRef(null)
    const refProfile = useRef(null)

    useEffect(() => {

        if (location?.pathname?.includes("/customer/")) {
            refHome.current.classList.remove("Mui-selected")
        } else {
            refHome.current.classList.add("Mui-selected")
        }

        if (location?.pathname?.includes("/search")) {
            refSearch.current.classList.add("Mui-selected")
        } else if (location?.pathname?.includes("/history")) {
            refHistory.current.classList.add("Mui-selected")
        } else if (location?.pathname?.includes("/cart")) {
            refCart.current.classList.add("Mui-selected")
        } else if (location?.pathname?.includes("/profile")) {
            refProfile.current.classList.add("Mui-selected")
        } else {
            refSearch.current.classList.remove("Mui-selected")
            refCart.current.classList.remove("Mui-selected")
            refHistory.current.classList.remove("Mui-selected")
            refProfile.current.classList.remove("Mui-selected")
        }

    }, [location.pathname])

    return (
        !location?.pathname?.includes("/account") ?
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: "10" }} >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{
                        backgroundColor: "#2F64F9",
                        height: {md: "70px", xs: "50px"}
                    }}
                >
                    <BottomNavigationAction
                        ref={refHome}
                        id="nav-btn1"
                        sx={{ color: "white" }}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="40" height="40"
                                viewBox="0 0 24 24">
                                <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                            </svg>
                        }
                        label="Home"
                        component={Link}
                        to={"/"} />
                    <BottomNavigationAction
                        ref={refSearch}
                        id="nav-btn2"
                        component={Link}
                        to={"search/searchpage"}
                        sx={{ color: "white" }}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="40" height="40"
                                viewBox="0 0 50 50">
                                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                            </svg>
                        }
                        label="Search" />
                    <BottomNavigationAction
                        ref={refHistory}
                        id="nav-btn3"
                        component={Link}
                        to={"transaction/history"}
                        sx={{ color: "white" }}
                        icon={
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="45" height="45" viewBox="0 0 96.000000 96.000000"
                                preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                                    stroke="none">
                                    <path d="M120 534 c0 -490 -30 -454 380 -454 261 0 288 2 316 19 92 56 78 216
-21 252 l-35 13 0 258 0 258 -58 0 c-46 0 -60 -4 -70 -20 -7 -11 -21 -20 -32
-20 -11 0 -25 9 -32 20 -9 14 -24 20 -48 20 -24 0 -39 -6 -48 -20 -7 -11 -21
-20 -32 -20 -11 0 -25 9 -32 20 -9 14 -24 20 -48 20 -24 0 -39 -6 -48 -20 -7
-11 -21 -20 -32 -20 -11 0 -25 9 -32 20 -10 16 -24 20 -70 20 l-58 0 0 -346z
m560 26 l0 -199 -240 -3 -240 -3 0 203 0 202 240 0 240 0 0 -200z m-416 -296
c29 -28 11 -104 -24 -104 -18 0 -40 33 -40 60 0 27 22 60 40 60 5 0 16 -7 24
-16z m520 0 c20 -20 20 -68 0 -88 -13 -14 -48 -16 -222 -16 l-207 0 0 60 0 60
207 0 c174 0 209 -2 222 -16z"/>
                                    <path d="M280 640 l0 -40 160 0 160 0 0 40 0 40 -160 0 -160 0 0 -40z" />
                                    <path d="M280 480 l0 -40 100 0 100 0 0 40 0 40 -100 0 -100 0 0 -40z" />
                                </g>
                            </svg>
                        }
                        label="History" />
                    <BottomNavigationAction
                        ref={refCart}
                        id="nav-btn4"
                        component={Link}
                        to={"cart/listcart"}
                        sx={{ color: "white" }}
                        icon={
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="45" height="45" viewBox="0 0 96.000000 96.000000"
                                preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                                    stroke="none">
                                    <path d="M124 735 c-12 -31 4 -45 50 -45 l44 0 42 -171 c40 -159 45 -173 69
-182 l27 -10 -28 -28 c-38 -37 -38 -81 1 -120 40 -39 82 -39 122 0 20 20 29
39 29 61 0 22 -9 41 -29 61 l-29 29 103 0 103 0 -29 -29 c-39 -40 -39 -82 0
-122 40 -39 82 -39 122 0 20 20 29 39 29 61 0 22 -9 41 -29 61 -16 16 -24 29
-17 29 31 0 47 33 86 172 22 82 40 150 40 153 0 3 -113 5 -251 5 -225 0 -251
-2 -245 -16 3 -9 6 -22 6 -30 0 -12 35 -14 205 -14 132 0 205 -4 205 -10 0 -6
-12 -53 -26 -105 l-27 -95 -172 0 -173 0 -42 170 c-31 125 -47 173 -61 180
-29 16 -119 12 -125 -5z m291 -495 c0 -18 -6 -26 -23 -28 -24 -4 -38 18 -28
44 3 9 15 14 28 12 17 -2 23 -10 23 -28z m270 0 c0 -18 -6 -26 -23 -28 -13 -2
-25 3 -28 12 -10 26 4 48 28 44 17 -2 23 -10 23 -28z"/>
                                </g>
                            </svg>
                        }
                        label="Cart" />
                    <BottomNavigationAction
                        ref={refProfile}
                        id="nav-btn5"
                        component={Link}
                        to={"profile/myaccount"}
                        sx={{ color: "white" }}
                        icon={
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="45" height="45" viewBox="0 0 96.000000 96.000000"
                                preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                                    stroke="none">
                                    <path d="M386 870 c-63 -16 -153 -70 -197 -117 -22 -24 -55 -74 -72 -111 -29
-61 -32 -76 -32 -163 0 -90 2 -99 37 -171 45 -91 103 -147 196 -191 61 -29 76
-32 162 -32 86 0 101 3 162 32 93 44 151 100 196 191 35 72 37 81 37 172 0 91
-2 100 -37 172 -68 136 -188 217 -336 224 -42 2 -94 -1 -116 -6z m225 -99 c69
-33 112 -74 150 -143 31 -58 34 -70 33 -148 0 -69 -4 -93 -22 -128 l-23 -43
-30 21 c-121 87 -357 87 -478 0 l-30 -21 -23 43 c-33 62 -32 192 2 263 42 86
123 152 215 176 49 13 158 2 206 -20z m27 -488 c31 -15 56 -32 55 -38 -1 -5
-30 -26 -65 -45 -58 -32 -69 -35 -148 -35 -87 1 -135 17 -198 66 l-23 17 30
21 c81 58 248 65 349 14z"/>
                                    <path d="M420 713 c-95 -49 -87 -193 13 -232 105 -40 206 61 166 166 -27 70
-111 101 -179 66z m94 -79 c9 -8 16 -24 16 -34 0 -43 -54 -65 -84 -34 -9 8
-16 24 -16 34 0 10 7 26 16 34 8 9 24 16 34 16 10 0 26 -7 34 -16z"/>
                                </g>
                            </svg>
                        }
                        label="Profile" />
                </BottomNavigation>
            </Paper>
            :
            <></>
    );
}

export default NavBar;