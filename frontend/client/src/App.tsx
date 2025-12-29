import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import ErrorPage from "./pages/ErrorPage"
import Layout from "./components/home/Layout"
import HomePage from "./pages/HomePage"
import PublicBrainPage from "./pages/PublicBrainPage"
import PrivateBrainPage from "./pages/PrivateBrainPage"
import SearchGlobalBrainPage from "./pages/SearchGlobalBrainPage"
import MyBrainPage from "./pages/MyBrainPage"
import ViewBrainPage from "./pages/ViewBrainPage"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/signin" element={<SigninPage />}></Route>
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/home/publicBrains" element={<PublicBrainPage />}></Route>
          <Route path="/home/privateBrains" element={<PrivateBrainPage />}></Route>
          <Route path="/home/globalBrains" element={<SearchGlobalBrainPage />}></Route>
        </Route>
        <Route path="/brain/:hash" element={<MyBrainPage />}></Route>
        <Route path="/view/brain/:hash" element={<ViewBrainPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
