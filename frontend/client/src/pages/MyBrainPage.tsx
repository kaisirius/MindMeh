import Button from "../components/home/Button";
import MindMehlogo from "../assets/MindMeh.png"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper";
import ContentCard from "../components/content/ContentCard";
import type { JSX } from "react";
import go_back from "../assets/go_back.png"
import { useNavigate, type NavigateFunction } from "react-router-dom";

const handleGoBack = (navigate: NavigateFunction) => {  
  if(window.history.length > 2) {
    navigate(-1);
  } else {
    navigate("/home", { replace:true })
  }
}


function MyBrainPage() {
  const navigate = useNavigate();
  const brainTitle = "System design";
  const currentBrains: JSX.Element[] = [
  <ContentCard  
    imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" 
    title="Javascript programming random" 
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
    editable={true}
    />,
  <ContentCard 
    imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" 
    title="Javascript programming" 
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    editable={true}
    />,
  <ContentCard 
    imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" 
    title="Javascript" 
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    editable={true}
    />
]
  return (
    <div className="w-screen h-screen bg-[#1C1229] bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
      <div className="w-screen h-auto bg-[#1C1229] bg-[radial-gradient(rgba(0,255,255,0.2)_1px,_transparent_1px)] bg-[size:16px_16px]">
        <div className="h-[100px] flex justify-between bg-[#1C1221] items-center shadow-[0_2px_4px] shadow-[#00FFFF] mb-9 sticky top-0 z-10">
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
            <Button innerText="+Add Content"/>
            <Button innerText="Toggle Visibility" />
            <Button innerText="MindMap AI" />
          </div>
        </div>
        <BrainsContainerWrapper>
          <>{currentBrains}</>
        </BrainsContainerWrapper>
      </div>  
    </div>
  )
} 

export default MyBrainPage