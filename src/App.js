import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

import MintFiles from "./components/MintFiles/MintFiles";
import Profile from "./components/Profile/Profile";
import SideNav from "./components/SideNav/SideNav";
import TopNav from "./components/TopNav/TopNav";


function App() {
  return (
    <div>
       <TopNav/>
 <div style={{ display: "flex" }}>
     
       <SideNav style={{ flex: "1 auto" }} />
       
       <Routes>
            <Route path="/mintfiles" element={<MintFiles/>}/>
            <Route path="/profile" element={<Profile/>}/>
              
            <Route path="/" element={<Dashboard/>}/>
             
          </Routes>
    </div>
    </div>
   
  );
}

export default App;
