import type { T_childrenProp } from "../../types/T_childrenProp"

const BrainsContainerWrapper = ({ children }: T_childrenProp) => {
  return (
    <div className="w-screen pl-[200px] pr-[200px] flex flex-wrap gap-[80px] gap-y-10 relative">
      {children}
    </div>
  )
} 

export default BrainsContainerWrapper