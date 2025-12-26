import BrainCard from "../components/brain/BrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"


const PrivateBrainPage = () => {


  const currentBrains = [<BrainCard />, <BrainCard />,<BrainCard />, <BrainCard />  ]

  return (
    <>
      <SubHeaderWapper>
        <>
          <SubHeader innerText="Private Brains" />
          <Button innerText="+Create Brain" />
        </>
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>{currentBrains}</>
      </BrainsContainerWrapper>
    </>
  )
}

export default PrivateBrainPage