import BrainCard from "../components/brain/BrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"
import type { JSX } from "react"


const HomePage = () => {


  const currentBrains: JSX.Element[] = [
  <BrainCard imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" title="Javascript programming random wqd" />,
  <BrainCard imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" title="Javascript programming" />,
  <BrainCard imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" title="Javascript" />,
  <BrainCard imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" title="Javascript" />,
  <BrainCard imageURL="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg" title="Javascript" />
]

  return (
    <>
      <SubHeaderWapper>
        <>
          <SubHeader innerText="All Brains" />
          <Button innerText="+Create Brain" />
        </>
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>{currentBrains}</>
      </BrainsContainerWrapper>
    </>
  )
}

export default HomePage