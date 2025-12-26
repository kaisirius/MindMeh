import { useState } from "react"
import MindMehlogo from "../../assets/MindMeh.png"
import Logout from "../../assets/logout.png"
import { Outlet } from "react-router-dom"

const Layout = () => {
  const [ currentTab, setCurrentTab ] = useState("Home");

  return (
    <div className="h-auto w-screen bg-[#1C1229]">
      <div className="flex h-[100px] bg-[#1C1221] shadow-[0_0px_20px] shadow-[#00FFFF]">
        <div id="logo" className="flex"> 
          <img src={MindMehlogo} className="m-[9px] mb-[10px] mr-[-5px]"/>
          <div className="text-[#00FFFF] flex justify-center items-center mr-[100px]">
            <p className="text-3xl">MindMeh</p>
          </div>
        </div>
        <div id="tabs" className="w-full flex justify-end items-center gap-[100px] text-[#00FFFF]">
          <div>
            <button className="">Home</button>
            {currentTab === "Home" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
          </div>
          <div>
            <button>Public</button>
            {currentTab === "Public" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
          </div>
          <div>
            <button>Private</button>
            {currentTab === "Private" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
          </div> 
          <div>
            <button>Global</button>
            {currentTab === "Global" ? <div className="w-full bg-[#00FFFF] h-[1px] "></div> : null}
          </div>
          <div className="ml-[280px] mr-[30px]">
            <button><img src={Logout} width={40}/></button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
    
  )
}

export default Layout