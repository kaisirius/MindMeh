import { useEffect } from "react"
import api from "../../utils/APIclient"
import axios from "axios"
import { Outlet, useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const CheckUser = async () => {
      try {
        await api.get("/CheckUser")
      } catch(err) {
        if(axios.isAxiosError(err)) { 
          navigate("/signup")
        }   
      }
    }
    CheckUser();
  }, [])
  return (<Outlet />)
}

export default Auth