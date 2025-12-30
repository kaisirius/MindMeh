import { useRef } from "react"
import AuthPageLayout from "../components/auth/AuthPageLayout"
import AuthButton from "../components/auth/AuthButton"
import { Link, useNavigate } from "react-router-dom"
import password_open_eye from "../assets/open_eye.png"
import password_close_eye from "../assets/close_eye.png"
import api from "../utils/APIclient"
import { toast } from "sonner"
import axios from "axios"

function SignupPage() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleUserSignup = async () => {
    if(!usernameRef.current || !emailRef.current || !passRef.current) return;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;

    // axios req & useNavigate
    const popup = toast.loading("Signing up...")

    try { 
      await api.post("/signup", {
        username,
        email,
        password
      })
      toast.success("New user has been created. Please login.", { id: popup })
      navigate("/signin")      
    } catch(err: unknown) {
      if(axios.isAxiosError(err)) { // type narrowing 

        const status = err.response?.status;
        
        if(status == 400) {
          toast.info("Wrong format of input. Password must have at least 6 characters with at least one lowercase letter, one uppercase letter and one special character.", { id: popup })
        } else if(status == 409) {
          toast.info("User already exists.", { id: popup })
        } else {
          navigate("/error")
        }
      }  
    }
  }

  const handlePassVisibility = () => {
    if(!passRef.current || !imgRef.current) return;
    if(passRef.current.getAttribute("type") === "password") {
      passRef.current.setAttribute("type", "text");
      imgRef.current.setAttribute("src", password_close_eye);
    } else {
      passRef.current.setAttribute("type", "password");
      imgRef.current.setAttribute("src", password_open_eye);
    }
  }

  return (
    <AuthPageLayout>
      <>
        <div>
          <p className="text-[#00FFFF] text-3xl mb-[45px]">Signup</p>
        </div>
        <div>
          <input ref={usernameRef} type="text" placeholder="username" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] w-[300px] mb-[30px]"></input>
        </div>
        <div>
          <input ref={emailRef}  type="email" placeholder="email" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] w-[300px] mb-[30px]"></input>
        </div>
        <div className="relative" id="pass-div">
          <input ref={passRef} type="password" placeholder="password" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] pr-[40px] w-[300px] mb-[10px]"></input>
          <button className="absolute w-[20px] h-[20px] right-[5px]" onClick={handlePassVisibility}><img ref={imgRef} src={password_open_eye} className="w-full"/></button>
        </div>
        <div>
          <p className="text-[#00FFFF] text-sm mb-[20px]">Already have an account? <Link to="/signin"><u>Login</u></Link></p>
        </div>
        <div onClick={handleUserSignup}><AuthButton innerText="Create account"/></div>
      </>
    </AuthPageLayout>
  )
} 

export default SignupPage