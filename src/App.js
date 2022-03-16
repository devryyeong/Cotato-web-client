import React, { Suspense } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

import LandingPage from "./components/LandingPage"
import NavBar from "./components/Common/NavBar"
import Footer from "./components/Common/Footer"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Edit from "./components/Auth/Edit"
import MyPage from "./components/Auth/MyPage"
import Posts from "./components/Postlist/PostList"
import PostCreate from "./components/Postcrud/Postcrud"
import PostEach from "./components/PostView/PostEach"
import { useAuth } from "./context/AuthContext"

function App({ postService }) {
  const navigate = useNavigate()

  const { user, logout, logIn } = useAuth()

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logout()
      navigate("/")
    }
  }

  const onLogin = () => {
    logIn()
    navigate("/")
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar onLogout={onLogout} />
      <div style={{ minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact
            path="/users/signin"
            element={<Login onLogin={onLogin} />}
          />
          <Route exact path="/users/signup" element={<Register />} />
          <Route exact path="/mypage" element={<MyPage />} />
          <Route exact path="/edit" element={<Edit />} />
          <Route exact path="/cotato/:category" element={<Posts />} />
          {/* <Route exact path="/:category/:id" element={<PostEach />} /> */}
          <Route
            exact
            path="/cotato/:category/:postNumber"
            element={<PostEach />}
          />

          <Route
            exact
            path="/cotato/:category/createPost"
            element={<PostCreate postService={postService} />}
          />
        </Routes>
      </div>

      <Footer />
    </Suspense>
  )
}

export default App
