import BrainCard from "../components/brain/BrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"
import { useState, type JSX } from "react"


const PrivateBrainPage = () => {


  const [CurrentBrains, setCurrentBrains] = useState<JSX.Element[]>([]);

  return (
    <>
      <SubHeaderWapper>
        <SubHeader innerText="Private Brains" />
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>
          {CurrentBrains.length > 0 ? {CurrentBrains} : 
          <div className="text-[#00FFFF] h-[400px] ml-[425px] flex justify-center items-center text-4xl opacity-50">No exisiting brain.</div>}
        </>
      </BrainsContainerWrapper>
    </>
  )
}

export default PrivateBrainPage