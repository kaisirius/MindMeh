import type { T_childrenProp } from "../../types/T_childrenProp"

const BrainsContainerWrapper = ({ children }: T_childrenProp) => {
  return (
    <div className="w-screen pl-[250px] pr-[250px] flex flex-wrap  gap-[120px] gap-y-10">
      {children}
    </div>
  )
} 

export default BrainsContainerWrapper