import type { T_contentCardProps } from "../../types/T_contentCardProps"
import { cn } from "../../../lib/utils"
import delete_icon from "../../assets/delete_icon.png"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import api from "../../utils/APIclient"
import { toast } from "sonner"
import { useCurrentContentsContext } from "../../context/ContentsContext"

const ContentCard = ({ imageURL, title, description, link, id, hash }: T_contentCardProps) => {

  const navigate = useNavigate();
  const { CurrentContents, setCurrentContents } = useCurrentContentsContext();

  const handleDeleteContent = async () => {
    try {
      await api.delete(`/api/v1/content/${hash}/${id}`)
      setCurrentContents(CurrentContents.filter(ct => ct.id !== id))
      toast.success("Content deleted")
    } catch(err) {
      if(axios.isAxiosError(err)) {
        if(err.response?.status === 404) {
          navigate("/NotFound")
        } else {
          navigate("/error")
        }
      }
    }
  }

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
        <button className="h-full size-10 flex justify-center items-center border-[#00FFFF] border-l-[2px] absolute right-0" onClick={handleDeleteContent}><img src={delete_icon} width={25} className=""/></button>
      </div>
      <div className="text-wrap w-full h-[100px] p-4 overflow-y-auto break-words" title={description}>
        <p className="text-[#00FFFF] relative" >
          {description}
        </p>
      </div>
    </div>
  )
}

export default ContentCard