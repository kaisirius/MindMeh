import { useState } from "react"
import MindMehlogo from "../../assets/MindMeh.png"
import Logout from "../../assets/logout.png"
import { Link, Outlet, useLocation } from "react-router-dom"

const Layout = () => {
  const location = useLocation();
  const url = location.pathname.split('/');
  let currentTab = "Home";
  console.log(url);
  if(url.length == 3) {
    if(url[2] === "publicBrains") currentTab = "Public"
    else if(url[2] === "privateBrains") currentTab = "Private"
    else if(url[2] === "globalBrains") currentTab = "Global"
  }
  return (
    <div className="bg-[#1C1229] w-screen h-screen bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
      <div className="h-auto w-screen bg-[#1C1229] bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
        <div className="flex h-[100px] bg-[#1C1221] shadow-[0_2px_4px] shadow-[#00FFFF] sticky top-0 z-10">
          <div id="logo" className="flex"> 
            <img src={MindMehlogo} className="m-[9px] mb-[10px] mr-[-5px]"/>
            <div className="text-[#00FFFF] flex justify-center items-center mr-[100px]">
              <p className="text-3xl">MindMeh</p>
            </div>
          </div>
          <div id="tabs" className="w-full flex justify-end items-center gap-[100px] text-[#00FFFF]">
            <div>
              <button><Link to="/home">Home</Link></button>
              {currentTab === "Home" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
            </div>
            <div>
              <button><Link to="/home/publicBrains">Public</Link></button>
              {currentTab === "Public" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
            </div>
            <div>
              <button><Link to="/home/privateBrains">Private</Link></button>
              {currentTab === "Private" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
            </div> 
            <div>
              <button><Link to="/home/globalBrains">Global</Link></button>
              {currentTab === "Global" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
            </div>
            <div className="ml-[280px] mr-[30px]">
              <button><img src={Logout} width={40}/></button>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout