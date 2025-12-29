import BrainCard from "../components/brain/BrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"
import search_icon from "../assets/search_icon.png"
import type { JSX } from "react"

const SearchGlobalBrainPage = () => {


  const currentBrains: JSX.Element[] = [];

  return (
    <>
      <SubHeaderWapper>
        <>
          <SubHeader innerText="Global Brains" />
          <div className="flex relative">
            <input type="text" placeholder="search other's brain..." className="h-[30px] w-[500px] p-5 pr-10 outline-none text-[#00FFFF] bg-transparent border border-[#00FFFF] rounded-3xl"></input>
            <button className="absolute right-1 top-1"><img src={search_icon} width={40}></img></button>
          </div>
          <div className="mr-[150px]"></div>
        </>
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>{currentBrains}</>
      </BrainsContainerWrapper>
    </>
  )
}

export default SearchGlobalBrainPage