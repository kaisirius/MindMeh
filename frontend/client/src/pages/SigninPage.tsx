import react from "react"
import AuthPageLayout from "../components/auth/AuthPageLayout"
import AuthButton from "../components/auth/AuthButton"
import AuthEmail from "../components/auth/AuthEmail"
import AuthPass from "../components/auth/AuthPass"
import { Link } from "react-router-dom"

function SigninPage() {
  return (
    <AuthPageLayout>
      <>
        <div>
          <p className="text-[#00FFFF] text-3xl mb-[45px]">Signin</p>
        </div>
        <AuthEmail />
        <AuthPass />
        <div>
          <p className="text-[#00FFFF] text-sm mb-[20px]">Don't have an account? <Link to="/signup"><u>Create account</u></Link></p>
        </div>
        <AuthButton innerText="Login"/>
      </>
    </AuthPageLayout>
  )
} 

export default SigninPage