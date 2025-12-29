import BrainCard from "../components/brain/BrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"
import type { JSX } from "react"


const PublicBrainPage = () => {


  const currentBrains: JSX.Element[] = [];

  return (
    <>
      <SubHeaderWapper>
        <>
          <SubHeader innerText="Public Brains" />
          <Button innerText="+Create Brain" />
        </>
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>{currentBrains}</>
      </BrainsContainerWrapper>
    </>
  )
}

export default PublicBrainPage