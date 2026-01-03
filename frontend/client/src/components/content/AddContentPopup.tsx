import { useRef } from "react";
import cross_icon from "../../assets/cross_icon.png"
import { toast } from "sonner";
import api from "../../utils/APIclient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentContentsContext } from "../../context/ContentsContext";

const AddContentPopup = ({ AddContentWindow, setAddContentWindow, hash } : {
  AddContentWindow: boolean,
  setAddContentWindow: React.Dispatch<React.SetStateAction<boolean>>,
  hash: string
}) => {

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const YTRef = useRef<HTMLInputElement>(null);
  const TwitterRef = useRef<HTMLInputElement>(null);
  const MediumRef = useRef<HTMLInputElement>(null);
  const RedditRef = useRef<HTMLInputElement>(null);
  const OtherRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { CurrentContents, setCurrentContents } = useCurrentContentsContext();

  const AddContent = async () => {
    if(!titleRef.current || !descriptionRef.current || !linkRef.current || !YTRef.current || !TwitterRef.current || !MediumRef.current || !RedditRef.current || !OtherRef.current) {
      console.log("Internal error")
      return;
    }
    if(!titleRef.current.value) {
      toast.info("Title can't be empty.")
    } else if(!linkRef.current.value) {
      toast.info("Must provide some link to resource")
    } else if(!YTRef.current.checked && !RedditRef.current.checked && !MediumRef.current.checked && !TwitterRef.current.checked && !OtherRef.current.checked) {
      toast.info("Please select the type of content")
    } else {
      const popup = toast.loading("Adding new content!");

      const title = titleRef.current.value
      const description = descriptionRef.current.value
      const link = linkRef.current.value
      let typeOfContent = "Other"
      let imageURL = "https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388932/OtherLink_default_r2oitg.jpg"
      if(YTRef.current.checked) { 
        typeOfContent = "Youtube"
        try {
          const res = await axios.get(`https://www.youtube.com/oembed?url=${link}&format=json`) 
          imageURL = res.data.thumbnail_url
        } catch(err) {
          navigate("/error")
        }
      }
      if(RedditRef.current.checked) { typeOfContent = "Reddit"; imageURL="https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388931/Reddit_default_sli0rh.png"}
      if(TwitterRef.current.checked) { typeOfContent = "Twitter"; imageURL="https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388932/X_default_lvbqpp.jpg"}
      if(MediumRef.current.checked) { typeOfContent = "Medium"; imageURL="https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388931/Medium_default_bffogs.png"}

      try {
        // const correctHash = hash.replace("%20", " ");
        const response = await api.post(`/api/v1/content/${hash}`, {
          title,
          description,
          link,
          typeOfContent
        })
        const id = response.data.id

        setTimeout(() => {
          toast.info("New content added.", { id: popup })
          setAddContentWindow(!AddContentWindow)
          setCurrentContents(existingContents => [...existingContents, { title, description, imageURL, link, id }])
        }, 1000)
      } catch(err) {
        if(axios.isAxiosError(err)) {
          if(err.response?.status === 400) {
            toast.info("Wrong input format to add new content.")
          } else if(err.response?.status === 404) {
            navigate("/NotFound")
          } else {
            navigate("/error")
          }
        }
      }
    }
  }

  return (
    <div className="absolute inset-0 h-screen w-screen bg-black/75 z-10">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="bg-[#1C1221] text-[#00FFFF] w-[400px] h-[425px] rounded-xl border-[2px] border-[#00FFFF] p-5">
          <div className="flex justify-end mb-2">
            <button onClick={() => setAddContentWindow(!AddContentWindow)}>
              <img src={cross_icon} width={30} />
            </button>
          </div>
          <div className="mb-2"><input ref={titleRef} type="text" placeholder="Enter title for the content" className="outline-none bg-transparent border border-[#00FFFF] rounded-xl p-2 w-full"></input></div>
          <div className="mb-2"><textarea ref={descriptionRef} placeholder="Enter description for the content" className="h-[100px] outline-none bg-transparent border border-[#00FFFF] rounded-xl p-2 w-full resize-none"></textarea></div>
          <div className="mb-2"><input ref={linkRef} type="text" placeholder="Enter content's link" className="outline-none bg-transparent border border-[#00FFFF] rounded-xl p-2 w-full mb-2"></input></div>
          <div>
            <div className="flex mb-3">
            <p>Content Type :</p>
              <label className="cursor-pointer">
                <input ref={YTRef} type="radio" name="contentType" value="public" id="public" className="peer sr-only" />
                <span className="px-5 py-2 text-[#00FFFF] rounded-md transition-colors duration-150
                            peer-checked:bg-[#00FFFF] peer-checked:text-[#1C1221]">
                  Youtube
                </span>
              </label>
              <label className="cursor-pointer">
                <input ref={RedditRef} type="radio" name="contentType" value="public" id="public" className="peer sr-only" />
                <span className="px-5 py-2 text-[#00FFFF] rounded-md transition-colors duration-150
                            peer-checked:bg-[#00FFFF] peer-checked:text-[#1C1221]">
                  Reddit
                </span>
            </label>
            </div>
            <div className="flex justify-end">
              <label className="cursor-pointer">
              <input ref={MediumRef} type="radio" name="contentType" value="public" id="public" className="peer sr-only" />
              <span className="px-5 py-2 text-[#00FFFF] rounded-md transition-colors duration-150
                          peer-checked:bg-[#00FFFF] peer-checked:text-[#1C1221]">
                Medium
              </span>
            </label>
            <label className="cursor-pointer">
              <input ref={TwitterRef} type="radio" name="contentType" value="public" id="public" className="peer sr-only" />
              <span className="px-5 py-2 text-[#00FFFF] rounded-md transition-colors duration-150
                          peer-checked:bg-[#00FFFF] peer-checked:text-[#1C1221]">
                Twitter
              </span>
            </label>
            <label className="cursor-pointer">
              <input ref={OtherRef} type="radio" name="contentType" value="public" id="public" className="peer sr-only" />
              <span className="px-5 py-2 text-[#00FFFF] rounded-md transition-colors duration-150
                          peer-checked:bg-[#00FFFF] peer-checked:text-[#1C1221]">
                Other
              </span>
            </label>
            </div>
            <div className="flex justify-center m-4">
              <button onClick={AddContent} className="border border-[#00FFFF] p-2 px-6 rounded-xl hover:opacity-75 active:opacity-50">create</button>
            </div>
          </div> 
        </div> 
      </div>
    </div>
  )
}

export default AddContentPopup