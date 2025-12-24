import react from "react"
import MindMehlogo from "./assets/MindMeh.png"
import password_close_eye from "./assets/close_eye.png"
import password_open_eye from "./assets/open_eye.png"

function App() {

  return (
    <div className="h-screen w-screen bg-[#1C122E] bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
      <div className="fixed top-[-150px] w-screen h-[200px] bg-[radial-gradient(ellipse,_rgba(0,255,255,1),_transparent_66%)]"> </div>
      <div className="fixed bottom-[-150px] w-screen h-[200px] bg-[radial-gradient(ellipse,_rgba(0,255,255,1),_transparent_66%)]"></div>
      <div className="flex justify-between relative top-[110px]"> 
        <div className="relative left-[150px]">
          <img src={MindMehlogo} width={500} className="relative left-[5px] hover:drop-shadow-[0_0.5px_1px_rgba(0,255,255,1)]"/>
          <div className="flex justify-center align-center">
            <p className="text-[#00FFFF] text-6xl font-semibold">MindMeh</p>
          </div>
        </div>
        <div className="relative right-[300px] top-[45px]">
          <div>
            <p className="text-[#00FFFF] text-3xl mb-[45px]">Signup</p>
          </div>
          <div>
            <input type="text" placeholder="username" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] w-[300px] mb-[30px]"></input>
          </div>
          <div>
            <input type="email" placeholder="email" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] w-[300px] mb-[30px]"></input>
          </div>
          <div className="relative" id="pass-div">
            <input type="password" placeholder="password" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] pr-[40px] w-[300px] mb-[10px]"></input>
            <button className="absolute w-[20px] h-[20px] right-[5px]" ><img src={password_open_eye} className="w-full"/></button>
          </div>
          <div>
            <p className="text-[#00FFFF] text-sm mb-[20px]">Already have an account? <a href="http://localhost:5173/signin"><u>Login</u></a></p>
          </div>
          <div className="flex justify-center">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] drop-shadow-[0_3px_1px_rgba(0,255,255,1)]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7B1FA2_0%,#00FFFF_50%,#7B1FA2_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#1C122E] hover:bg-transparent transition ease-linear px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Create account  
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
