import react from "react"
import type { T_btnContent } from "../../types/T_btnContent"


function AuthButton({ innerText }: T_btnContent) {
  return (
    <div className="flex justify-center">
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] drop-shadow-[0_3px_1px_rgba(0,255,255,1)] w-[150px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7B1FA2_0%,#00FFFF_50%,#7B1FA2_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#1C122E] hover:bg-transparent transition ease-linear px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          {innerText}  
        </span>
      </button>
    </div>
  )
}

export default AuthButton