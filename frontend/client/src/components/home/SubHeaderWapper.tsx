import type { T_childrenProp } from "../../types/T_childrenProp"

const SubHeaderWapper = ({ children }: T_childrenProp) => {
  return (
    <div className="h-[100px] flex justify-between items-center">
      {children}
    </div>
  )
} 

export default SubHeaderWapper