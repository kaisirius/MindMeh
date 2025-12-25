import react, { useRef } from "react"
import AuthPageLayout from "../components/auth/AuthPageLayout"
import AuthButton from "../components/auth/AuthButton"
import { Link } from "react-router-dom"
import password_open_eye from "../assets/open_eye.png"
import password_close_eye from "../assets/close_eye.png"

function SigninPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);


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
          <p className="text-[#00FFFF] text-3xl mb-[45px]">Signin</p>
        </div>
        <div>
          <input ref={emailRef}  type="email" placeholder="email" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] w-[300px] mb-[30px]"></input>
        </div>
        <div className="relative" id="pass-div">
          <input ref={passRef} type="password" placeholder="password" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] pr-[40px] w-[300px] mb-[10px]"></input>
          <button className="absolute w-[20px] h-[20px] right-[5px]" onClick={handlePassVisibility}><img ref={imgRef} src={password_open_eye} className="w-full"/></button>
        </div>
        <div>
          <p className="text-[#00FFFF] text-sm mb-[20px]">Don't have an account? <Link to="/signup"><u>Create account</u></Link></p>
        </div>
        <AuthButton innerText="Login"/>
      </>
    </AuthPageLayout>
  )
} 

export default SigninPage