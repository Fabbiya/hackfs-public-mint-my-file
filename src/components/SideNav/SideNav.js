import React from "react";
import { useNavigate} from 'react-router-dom'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { useMoralis } from "react-moralis";


export default function SideNav() {
  const navigate = useNavigate();

  const { logout } = useMoralis();
  const logOut = async () => {
    await logout();
    console.log("logged out");
  };
  const navigateDashboard = ()=>{
    navigate("/")
  }
  const navigateMintFiles = ()=>{
    navigate("/mintfiles")
  }
  const navigateProfile = ()=>{
    navigate("/profile")
  }
  return (
    <CDBSidebar style={{ height: "100vh" }}>
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        HACKFS
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem  icon="th-large" onClick={navigateDashboard} >Dashboard</CDBSidebarMenuItem>
          <CDBSidebarMenuItem to="/content" icon="sticky-note" onClick={navigateMintFiles}>Mint Files</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user" onClick={navigateProfile}>My Profile</CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
      <CDBSidebarFooter >
        <CDBSidebarMenuItem icon="power-off" onClick={logOut}>
          Logout
        </CDBSidebarMenuItem>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
}
