import react, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import ErrorPage from "./pages/ErrorPage"
import Layout from "./components/home/Layout"
import HomePage from "./pages/HomePage"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/signin" element={<SigninPage />}></Route>
        <Route path="/home" element={<Layout />}>
          <Route path="/home" element={<HomePage />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
