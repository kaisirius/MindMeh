import { useEffect, useRef } from "react";
import cross_icon from "../../assets/cross_icon.png"
import { toast } from "sonner";
import api from "../../utils/APIclient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { T_currentBrainProps } from "../../types/T_currentBrainProps";

const CreateBrainPopup = ({ CreateBrainWindow, setCreateBrainWindow, CurrentBrains, setCurrentBrains }: 
  { CreateBrainWindow: boolean ,setCreateBrainWindow: React.Dispatch<React.SetStateAction<boolean>>,
    CurrentBrains: T_currentBrainProps[], setCurrentBrains: React.Dispatch<React.SetStateAction<T_currentBrainProps[]>>
  }) => {

  const titleRef = useRef<HTMLInputElement>(null);
  const publicTypeRef = useRef<HTMLInputElement>(null);  
  const privateTypeRef = useRef<HTMLInputElement>(null);  
  const fileRef = useRef<HTMLInputElement>(null);  
  const readerRef = useRef<FileReader | null>(null); // using useRef for checking mount status and reader
  const isMountedRef = useRef<boolean>(true); // to prevent memory leaks
  const navigate = useNavigate();

  useEffect(() => {
    readerRef.current = new FileReader();
    isMountedRef.current = true;

    return () => {
      if(readerRef.current && readerRef.current.readyState === 1) {
        readerRef.current.abort()
      }
      if(readerRef.current) readerRef.current.onload = null;
    }
  }, [])

  const UploadBrain = async (title: string, share: boolean, popup: string|number, base64?: string) => {    
    let imageId = "6956732a17c60fc46f3adbf5" // default MindMeh logo
    let imageURL = "https://res.cloudinary.com/dsg40cxk3/image/upload/v1767297737/new_mindmeh_default_52faf3.jpg"

    if(base64) {
      try{
        const ReqSignature = await api.get("/api/v1/image/getSignedURL")
        const { timestamp, api_key, signature } = ReqSignature.data;
        const UploadImageResponse =  await axios.post("https://api.cloudinary.com/v1_1/dsg40cxk3/image/upload", 
          {
            timestamp,
            api_key,
            signature,
            file: base64,
            asset_folder: "MindMeh"
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        imageURL = UploadImageResponse.data.secure_url;
        const DBQqueryToPostImage = await api.post("/api/v1/image/uploadURL", { imageURL });
        imageId = DBQqueryToPostImage.data.id;
        // might need to save this id in state
      } catch(err) {
        navigate("/error")
        return;
      }
    }
    try {
      const response = await api.post("/api/v1/brain", {
        title,
        share,
        imageId
      });
      // store the hash in brain's state
      const hash = response.data.hash as string;

      setTimeout(() => {
        toast.info("New brain created!", {id: popup})
        setCreateBrainWindow(!CreateBrainWindow)
        setCurrentBrains(exisitingBrains => [...exisitingBrains, { title, hash, imageURL }])
      }, 1000)
      
    } catch(err) {
      if(axios.isAxiosError(err)) {
        if(err.response?.status == 400) {
          toast.warning("Invalid request to create brain")
        } else {
          navigate("/error")
        }
      }
    }
  }

  const CreateBrain = () => {
    if(!titleRef.current || !publicTypeRef.current || !privateTypeRef.current || !fileRef.current || !isMountedRef.current || !readerRef.current) {
      console.log("Internal error")
      return;
    }
    if(!titleRef.current.value) {
      toast.info("Title can't be empty.")
    } else if(!publicTypeRef.current.checked && !privateTypeRef.current.checked) {
      toast.info("Please select the visibility of brain")
    } else {
      const popup = toast.loading("Initialising a new brain...")
      const title = titleRef.current.value;
      let share = false;
      if(publicTypeRef.current.checked) share = true;
      
      const reader = readerRef.current;
      if(reader && fileRef.current.files && fileRef.current.files?.length > 0) {
        const file = fileRef.current.files[0];
        
        reader.onload = () => {
          const base64 = reader.result as string;
          if(base64) {
            if(isMountedRef.current) UploadBrain(title, share, popup, base64)
          }
        }
        reader.readAsDataURL(file) 
      } else {
        UploadBrain(title, share, popup) // no base64
      }
    }
  }


  return (
    <div className="absolute inset-0 h-screen w-screen bg-black/75 z-10">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="bg-[#1C1221] text-[#00FFFF] w-[400px] h-[350px] rounded-xl border-[2px] border-[#00FFFF] p-5">
          <div className="flex justify-end mb-2">
            <button onClick={() => setCreateBrainWindow(!CreateBrainWindow)}>
              <img src={cross_icon} width={30} />
            </button>
          </div>
          <div className="mb-2"><input ref={titleRef} type="text" placeholder="Enter title for the brain" className="outline-none bg-transparent border border-[#00FFFF] rounded-xl p-2 w-full"></input></div>
          <div className="flex justify-center text-sm opacity-75 mb-5"><p>Keep the title short and concise.</p></div>
          <div className="flex justify-evenly mb-7">
            <p>Visibility :</p>
            <label className="cursor-pointer">
              <input ref={publicTypeRef} type="radio" name="visibility" value="public" id="public" className="peer sr-only" />
              <span className="px-5 py-2 text-[#00FFFF] rounded-md transition-colors duration-150
                          peer-checked:bg-[#00FFFF] peer-checked:text-[#1C1221]">
                Public
              </span>
            </label>
            <label className="cursor-pointer">
              <input ref={privateTypeRef} type="radio" name="visibility" value="public" id="public" className="peer sr-only" />
              <span className="px-5 py-2 text-[#00FFFF] rounded-md transition-colors duration-150
                          peer-checked:bg-[#00FFFF] peer-checked:text-[#1C1221]">
                Private
              </span>
            </label>
          </div>
          <div className="relative">
            <p className="mb-2">Upload front cover to brain (Optional) :</p>
            <input ref={fileRef} type="file" accept="image/png, image/jpg, image/jpeg"></input>
          </div>
          <div className="flex justify-center m-4">
            <button onClick={CreateBrain} className="border border-[#00FFFF] p-2 px-6 rounded-xl hover:opacity-75 active:opacity-50">create</button>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default CreateBrainPopup