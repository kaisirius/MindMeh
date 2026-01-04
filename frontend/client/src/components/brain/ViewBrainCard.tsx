import type { T_brainCardProps } from "../../types/T_brainCardProps"
import { cn } from "../../../lib/utils"
import delete_icon from "../../assets/delete_icon.png"
import { useCurrentBrainsContext } from "../../context/BrainsContext"
import api from "../../utils/APIclient"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ViewBrainCard =  ({ imageURL, title, hash }: T_brainCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-[300px] drop-shadow-[0px_0px_5px_rgba(0,255,255,0.5)] border-[2px] border-[#00FFFF] rounded-3xl" title={title}>
      <div
        onClick={() => navigate(`/view/brain/${hash}`)}
        className={cn(
          "cursor-pointer group/card overflow-hidden relative card h-[250px] rounded-3xl rounded-b-none mx-auto backgroundImage flex flex-col justify-between p-4 bg-[length:100%_100%] bg-no-repeat"
        )}
        style={{ backgroundImage: `url('${imageURL}')` }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
      </div>
      <div className="text content w-full relative flex flex-row border-[#00FFFF] border-t-[2px]">
        <p className="font-semibold text-[#00FFFF] relative truncate pl-4 pb-4 pt-4 pr-10" >
          {title}
        </p>
      </div>
    </div>
  )
} 



export default ViewBrainCard