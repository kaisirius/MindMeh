import react from "react"
import AuthPageLayout from "../components/auth/AuthPageLayout"
import AuthButton from "../components/auth/AuthButton"
import AuthEmail from "../components/auth/AuthEmail"
import AuthPass from "../components/auth/AuthPass"
import { Link } from "react-router-dom"

function SignupPage() {
  return (
    <AuthPageLayout>
      <>
        <div>
          <p className="text-[#00FFFF] text-3xl mb-[45px]">Signup</p>
        </div>
        <div>
          <input type="text" placeholder="username" className="text-[#00FFFF] bg-transparent outline-none border-b-[2px] border-[#00FFFF] p-[5px] w-[300px] mb-[30px]"></input>
        </div>
        <AuthEmail />
        <AuthPass />
        <div>
          <p className="text-[#00FFFF] text-sm mb-[20px]">Already have an account? <Link to="/signin"><u>Login</u></Link></p>
        </div>
        <AuthButton innerText="create account"/>
      </>
    </AuthPageLayout>
  )
} 

export default SignupPage