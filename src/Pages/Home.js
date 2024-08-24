import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    useProSidebar,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { FcLeave } from "react-icons/fc";
import CallIcon from "@mui/icons-material/Call";
import Navbar from "../Component/Navbar/Navbar";

const Home = () => {
    const { collapseSidebar, collapsed } = useProSidebar();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        collapseSidebar();
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/Login')
    }
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar
                className="app"
                style={{
                    height: "100vh",
                    // border: "1px solid #052e3d",
                    marginLeft: "1px",
                    position: "fixed",
                    top: 0,
                    left: 0,
                }}
                collapsed={isCollapsed}
            >
                <Menu>
                    <MenuItem
                        className="menu1"
                        icon={<MenuRoundedIcon onClick={toggleSidebar} />}
                    >
                        <h2>sidebar</h2>
                    </MenuItem>
                    <MenuItem component={<NavLink to="/" />} icon={<GridViewRoundedIcon />}>
                        Home
                    </MenuItem>
                    <MenuItem
                        icon={<AccountCircleRoundedIcon />}
                        component={<NavLink to="/profiledetails" />}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        icon={<AccountCircleRoundedIcon />}
                        component={<NavLink to="/feedbackdetails" />}
                    >
                        Feedback
                    </MenuItem>
                    {/* <SubMenu icon={<BarChartRoundedIcon />} label="Charts">
                        <MenuItem>Timeline Chart</MenuItem>
                        <MenuItem>Bubble Chart</MenuItem>
                    </SubMenu> */}
                    <MenuItem component={<NavLink to="/workdetails" />} icon={<CallIcon />}>
                        Work Allocate
                    </MenuItem>
                    <MenuItem component={<NavLink to="/activitydetails" />} icon={<MonetizationOnRoundedIcon />}>Activity Section</MenuItem>
                    {/* <SubMenu icon={<PermDataSettingIcon />} label="Settings">
                        <MenuItem>Account</MenuItem>
                        <MenuItem>Privacy</MenuItem>
                        <MenuItem>Notifications</MenuItem>
                    </SubMenu> */}
                    <MenuItem component={<NavLink to="/requestdetails" />} icon={<CallIcon />}>
                        Request Section
                    </MenuItem>
                    <MenuItem component={<NavLink to="/leavedetails" />} icon={<FcLeave />}>
                        Leave Application
                    </MenuItem>
                    <MenuItem component={<NavLink to="/attendancedetails" />} icon={<FcLeave />}>
                        Attendance Sheets
                    </MenuItem>
                    <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Sidebar>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                marginLeft: isCollapsed ? "80px" : "250px",
                transition: "margin-left 0.3s"
            }}>
                <header className="pc-header" style={{ width: "100%" }}>
                    <Navbar onClick={toggleSidebar} />
                </header>
                <div style={{ flex: 1, padding: "10px" }}>
                    {/* <h1>WELCOME TO QUICKPAY</h1> */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;
