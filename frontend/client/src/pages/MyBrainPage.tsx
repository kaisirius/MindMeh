import Button from "../components/home/Button";
import MindMehlogo from "../assets/MindMeh.png"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper";
import ContentCard from "../components/content/ContentCard";
import { useEffect, useState, type JSX } from "react";
import go_back from "../assets/go_back.png"
import { useLocation, useNavigate, type NavigateFunction } from "react-router-dom";
import api from "../utils/APIclient";
import axios from "axios";
import type { T_contentCardProps } from "../types/T_contentCardProps";
import type { T_content } from "../types/T_content";
import AddContentPopup from "../components/content/AddContentPopup";
import { CurrentContentsContext } from "../context/ContentsContext";
import { toast } from "sonner";

const handleGoBack = (navigate: NavigateFunction) => {  
  if(window.history.length > 2) {
    navigate(-1);
  } else {
    navigate("/home", { replace:true })
  }
}


function MyBrainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const hash = path[2];
  const title = hash.split('-')[0];
  const brainTitle = title.replace("%20", " "); 

  const [ AddContentWindow, setAddContentWindow ] = useState<boolean>(false); 
  const [ CurrentContents, setCurrentContents ] = useState<T_contentCardProps[]>([]);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content: T_content[] = (await api.get(`/home/brain/${hash}`)).data.listOfContents
        const ImageOfContents: string[] = [];

        for(let i = 0; i < content.length; i++) {
          if(content[i].typeOfContent === "Youtube") {
            const res= await axios.get(`https://www.youtube.com/oembed?url=${content[i].link}&format=json`) 
            ImageOfContents[i] = res.data.thumbnail_url
          } else if(content[i].typeOfContent === "Reddit") {
            ImageOfContents[i] = "https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388931/Reddit_default_sli0rh.png"
          } else if(content[i].typeOfContent === "Twitter") {
            ImageOfContents[i] = "https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388932/X_default_lvbqpp.jpg"
          } else if(content[i].typeOfContent === "Medium") {
            ImageOfContents[i] = "https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388931/Medium_default_bffogs.png"
          } else {
            ImageOfContents[i] = "https://res.cloudinary.com/dsg40cxk3/image/upload/v1767388932/OtherLink_default_r2oitg.jpg"
          } 
        }
        setCurrentContents(content.map((ct, idx) => {
          return {
            imageURL: ImageOfContents[idx],
            link: ct.link,
            title: ct.title,
            description: ct.description,
            id: ct._id
          }
        }))
      } catch(err) {
        if(axios.isAxiosError(err)) {
          if(err.response?.status == 404) navigate("/NotFound")
          else navigate("/error")
        }
      }
    }

    fetchContent()
  }, [])

  const ContentComponents: JSX.Element[] = []
  for(let i = 0; i < CurrentContents.length; i++) {
    ContentComponents[i] = <ContentCard hash={hash} id={CurrentContents[i].id} link={CurrentContents[i].link} title={CurrentContents[i].title} imageURL={CurrentContents[i].imageURL} description={CurrentContents[i].description} key={i} />
  }

  const changeVisibility = async () => {
    try {
      const response = await api.get(`/home/brain/${hash}`)
      const currentStatus: boolean = response.data.share;
      await api.put(`/api/v1/brain/${hash}`, { share: !currentStatus })
      toast.success(`Visibility changed to ${currentStatus ? "Private" : "Public"}`)
      
    } catch(err) {
      if(axios.isAxiosError(err)) {
        if(err.response?.status === 404) navigate("/NotFound")
        else navigate("/error")
      }
    }
  }

  return (
    <CurrentContentsContext.Provider value={{CurrentContents, setCurrentContents}}>
      <div className="w-screen h-screen bg-[#1C1229] bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
        <div className="relative w-screen h-auto bg-[#1C1229] bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
          <div className="h-[100px] flex justify-between bg-[#1C1221] items-center shadow-[0_2px_4px] shadow-[#00FFFF] mb-9 sticky top-0 z-10">
            {AddContentWindow ? <AddContentPopup AddContentWindow={AddContentWindow} setAddContentWindow={setAddContentWindow} hash={hash} /> : null}
            <div className="flex items-center">
              <div className="flex items-center justify-center m-2 mr-0">
                <button onClick={() => handleGoBack(navigate)} className="w-8 h-8 rounded-lg hover:bg-slate-800 transition duration-150">
                  <img src={go_back} />
                </button>
              </div>
              <img src={MindMehlogo} width={118} className="m-[9px] ml-0 mb-[10px]"/>
              <div className="text-[#00FFFF] text-2xl">
                <p>{brainTitle}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div onClick={() => setAddContentWindow(!AddContentWindow)}><Button innerText="+Add Content"/></div>
              <div onClick={changeVisibility}><Button innerText="Toggle Visibility" /></div>
              <Button innerText="MindMap AI" />
            </div>
          </div>
          <BrainsContainerWrapper>
            <>
              {
                CurrentContents.length > 0 ? ContentComponents : 
                <div className=" text-[#00FFFF] h-[400px] ml-[425px] flex justify-center items-center text-4xl opacity-50">No content available.</div>
              }
            </>
          </BrainsContainerWrapper>
        </div>  
      </div>
    </CurrentContentsContext.Provider>
  )
} 

export default MyBrainPage