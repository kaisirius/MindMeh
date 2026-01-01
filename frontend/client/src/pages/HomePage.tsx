import BrainCard from "../components/brain/BrainCard"
import SubHeader from "../components/home/SubHeader"
import Button from "../components/home/Button"
import SubHeaderWapper from "../components/home/SubHeaderWapper"
import BrainsContainerWrapper from "../components/home/BrainsContainerWrapper"
import { useEffect, useState, type JSX } from "react"
import CreateBrainPopup from "../components/brain/CreateBrainPopup"
import api from "../utils/APIclient"
import type { T_brain } from "../types/T_brain"
import type { T_currentBrainProps } from "../types/T_currentBrainProps"


const HomePage = () => {
  const [CreateBrainWindow, setCreateBrainWindow] = useState<boolean>(false); 
  const [CurrentBrains, setCurrentBrains] = useState<T_currentBrainProps[]>([]);

  useEffect(() => {
    const fetchBrains = async () => {
      const response = await api.get("/home/brains");
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
    <>
    {CreateBrainWindow ? <CreateBrainPopup 
                          CreateBrainWindow={CreateBrainWindow} setCreateBrainWindow={setCreateBrainWindow} 
                          CurrentBrains={CurrentBrains} setCurrentBrains={setCurrentBrains} /> : null}
      <SubHeaderWapper>
        <>
          <SubHeader innerText="All Brains" />
          <div onClick={() => setCreateBrainWindow(!CreateBrainWindow)}><Button innerText="+Create Brain"/></div>
        </>
      </SubHeaderWapper>
      <BrainsContainerWrapper>
        <>
          {
            CurrentBrains.length > 0 ? BrainComponents : 
            <div className=" text-[#00FFFF] h-[400px] ml-[425px] flex justify-center items-center text-4xl opacity-50">No exisiting brain.</div>
          }
        </>
      </BrainsContainerWrapper>
    </>
  )
}

export default HomePage