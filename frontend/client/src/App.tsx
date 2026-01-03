import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import NotFound from "./pages/NotFound"
import Layout from "./components/home/Layout"
import HomePage from "./pages/HomePage"
import PublicBrainPage from "./pages/PublicBrainPage"
import PrivateBrainPage from "./pages/PrivateBrainPage"
import SearchGlobalBrainPage from "./pages/SearchGlobalBrainPage"
import MyBrainPage from "./pages/MyBrainPage"
import ViewBrainPage from "./pages/ViewBrainPage"
import { RecoilRoot } from "recoil"
import { Toaster } from "./components/ui/sonner"
import Auth from "./components/auth/Auth"
import ErrorPage from "./pages/ErrorPage"

function App() {
  
  return (
    <>
      <Toaster position="top-center"
        toastOptions={{
          style: {
            background: "#1C1229",
            color: "#00FFFF",
            border: "1px solid #00FFFF",
            borderRadius: "8px",
            fontSize: "15px"
          },
        }}
        style={
          {
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",

            "--normal-bg": "#1C1229",
            "--normal-text": "#00FFFF",
            "--normal-border": "#00FFFF",
          } as React.CSSProperties
        } />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route element={<Auth />}>
              <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/home/publicBrains" element={<PublicBrainPage />}></Route>
                <Route path="/home/privateBrains" element={<PrivateBrainPage />}></Route>
                <Route path="/home/globalBrains" element={<SearchGlobalBrainPage />}></Route>
              </Route>  
              <Route path="/brain/:hash" element={<MyBrainPage />}></Route>
              <Route path="/view/brain/:hash" element={<ViewBrainPage />}></Route>
            </Route>    
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
    
  )
}

export default App
