import BrainCard from "../components/brain/MyBrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"
import { useEffect, useState, type JSX } from "react"
import type { T_currentBrainProps } from "../types/T_currentBrainProps"
import api from "../utils/APIclient"
import type { T_brain } from "../types/T_brain"
import { CurrentBrainsContext } from "../context/BrainsContext"


const PublicBrainPage = () => {

  const [CurrentBrains, setCurrentBrains] = useState<T_currentBrainProps[]>([]);

  useEffect(() => {
    const fetchBrains = async () => {
      const response = await api.get("/api/v1/publicBrains");
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
    fetchBrains()
  }, [])

  const BrainComponents: JSX.Element[] = [];
  for(let i = 0; i < CurrentBrains.length; i++) {
    BrainComponents[i] = <BrainCard hash={CurrentBrains[i].hash} title={CurrentBrains[i].title} imageURL={CurrentBrains[i].imageURL} key={i} />
  }
  return (
    <CurrentBrainsContext.Provider value={{CurrentBrains, setCurrentBrains}}>
      <SubHeaderWapper>
        <SubHeader innerText="Public Brains" />
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>
          {CurrentBrains.length > 0 ? BrainComponents : 
          <div className="text-[#00FFFF] h-[400px] ml-[425px] flex justify-center items-center text-4xl opacity-50">No exisiting brain.</div>}
        </>
      </BrainsContainerWrapper>
    </CurrentBrainsContext.Provider>
  )
}

export default PublicBrainPage