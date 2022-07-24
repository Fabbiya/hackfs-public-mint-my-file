import React from "react";
import {  Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Files from "./components/Files/Files";
import MintNFTs from "./components/NFTs/MintNFTs";
import Profile from "./components/Profile/Profile";
import TopNav from "./components/TopNav/TopNav";


function App() {
  return (
    <div>
       <TopNav/>
 <div style={{ display: "flex" }}>
     
       {/* <SideNav style={{ flex: "1 auto" }} /> */}
       
       <Routes>
            <Route path="/files" element={<Files/>}/>
            <Route path="/mintnfts" element={<MintNFTs/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/" element={<Dashboard/>}/>
             
          </Routes>
    </div>
    </div>
   
  );
}

export default App;
