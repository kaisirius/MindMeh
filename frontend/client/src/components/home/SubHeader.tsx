import type { T_btnContent } from "../../types/T_btnContent"

const SubHeader = ({ innerText } : T_btnContent) => {
  return (
    <div className="ml-[123px] text-[#00FFFF] text-2xl">
      <p>{innerText}</p>
    </div>
  )
}

export default SubHeader