import type { T_contentCardProps } from "../../types/T_contentCardProps"
import { cn } from "../../../lib/utils"

const ViewContentCard = ({ imageURL, title, description, link }: T_contentCardProps) => {

  return (
    <div className="w-[500px] drop-shadow-[0px_0px_5px_rgba(0,255,255,0.5)] border-[2px] border-[#00FFFF] rounded-3xl" title={title}>
      <a href={link} target="_blank">
        <div
        onClick={() => console.log("hmm")}
        className={cn(
          "w-full cursor-pointer group/card overflow-hidden relative card h-[250px] rounded-3xl rounded-b-none mx-auto backgroundImage flex flex-col justify-between p-4 bg-[length:100%_100%] bg-no-repeat"
        )}
        style={{ backgroundImage: `url('${imageURL}')` }}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        </div>
      </a>
      <div className="text content w-full relative flex flex-row border-[#00FFFF] border-b-[2px] border-t-[2px] ">
        <p className="font-semibold text-[#00FFFF] relative truncate pl-4 pb-4 pt-4 pr-10" >
          {title}
        </p>
      </div>
      <div className="text-wrap w-full h-[100px] p-4 overflow-y-auto break-words" title={description}>
        <p className="text-[#00FFFF] relative" >
          {description}
        </p>
      </div>
    </div>
  )
}

export default ViewContentCard