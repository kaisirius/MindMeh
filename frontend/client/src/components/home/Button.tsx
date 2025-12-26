import type { T_btnContent } from "../../types/T_btnContent"

const Button = ({ innerText }: T_btnContent) => {
  return (
    <div className="mr-[123px]">
      <button className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#7B1FA2] to-60% rounded-lg" />
        <div className="px-5 py-2  bg-[#1C1229] rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
          {innerText}
        </div>
      </button>
    </div>
  )
}

export default Button