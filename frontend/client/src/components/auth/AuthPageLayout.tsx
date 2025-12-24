import react from "react"
import MindMehlogo from "../../assets/MindMeh.png"
import type { T_childrenProp } from "../../types/T_childrenProp"

function AuthPageLayout({ children }: T_childrenProp) {
  return (
    <div className="h-screen w-screen bg-[#1C122E] bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
      <div className="fixed top-[-150px] w-screen h-[200px] bg-[radial-gradient(ellipse,_rgba(0,255,255,1),_transparent_66%)]"> </div>
      <div className="fixed bottom-[-150px] w-screen h-[200px] bg-[radial-gradient(ellipse,_rgba(0,255,255,1),_transparent_66%)]"></div>
      <div className="flex justify-between relative top-[110px]"> 
        <div className="relative left-[150px]">
          <img src={MindMehlogo} width={500} className="relative left-[5px] hover:drop-shadow-[0_0.5px_1px_rgba(0,255,255,1)] transition ease-linear  "/>
          <div className="flex justify-center align-center">
            <p className="text-[#00FFFF] text-6xl font-semibold">MindMeh</p>
          </div>
        </div>
        <div className="relative right-[300px] top-[45px]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthPageLayout