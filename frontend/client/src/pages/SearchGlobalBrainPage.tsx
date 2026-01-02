import BrainCard from "../components/brain/MyBrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"
import search_icon from "../assets/search_icon.png"
import { useRef, useState } from "react"
import type { T_currentBrainProps } from "../types/T_currentBrainProps"
import { toast } from "sonner"
import api from "../utils/APIclient"
import type { T_brain } from "../types/T_brain"
import ViewBrainCard from "../components/brain/ViewBrainCard"

const SearchGlobalBrainPage = () => {
  const [CurrentBrains, setCurrentBrains] = useState<T_currentBrainProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const getGlobalBrains = async () => {
    const UserInput = inputRef.current?.value as string
    if(UserInput?.length === 0) toast.info("Empty title not allowed.")
    else {
      const response = await api.get(`/api/v1/globalbrains?search=${UserInput}`);
      const Brains: T_brain[] = response.data.listOfBrains;
      const ImageOfBrains: string[] = [];

      for(let i = 0; i < Brains.length; i++) {
        const id = Brains[i].imageId;
        const res = (await api.get(`/api/v1/image/${id}`)).data.imageURL as string
        ImageOfBrains[i] = res;
      }
      setCurrentBrains(Brains.map((b: T_brain, idx) => {
        return {
          title: b.title,
          hash: b.hash,
          imageURL: ImageOfBrains[idx]
        }
      }));
    }
  }

  const SearchGlobalBrains = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown') {
    const kbEvent = event as React.KeyboardEvent;
    if (kbEvent.key === "Enter") {
      getGlobalBrains();
    }
    } else if (event.type === 'click') {
      getGlobalBrains();
    }
  }

  const BrainComponents = CurrentBrains.map((b, idx) => {
    return <ViewBrainCard title={b.title} imageURL={b.imageURL} hash={b.hash} key={idx} />
  })

  return (
    <>
      <SubHeaderWapper>
        <>
          <SubHeader innerText="Global Brains" />
          <div className="flex relative">
            <input ref={inputRef} onKeyDown={SearchGlobalBrains} type="text" placeholder="search other's brain..." className="h-[30px] w-[500px] p-5 pr-10 outline-none text-[#00FFFF] bg-transparent border border-[#00FFFF] rounded-3xl"></input>
            <button onClick={SearchGlobalBrains} className="absolute right-1 top-1"><img src={search_icon} width={40}></img></button>
          </div>
          <div className="mr-[150px]"></div>
        </>
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>
          {
              CurrentBrains.length > 0 ? BrainComponents :
              <div className=" text-[#00FFFF] h-[400px] ml-[425px] flex justify-center items-center text-4xl opacity-50">Look for other's brains.</div>
          }
        </>
      </BrainsContainerWrapper>
    </>
  )
}

export default SearchGlobalBrainPage