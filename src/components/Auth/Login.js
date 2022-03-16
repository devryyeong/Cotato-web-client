import React, { useState } from "react"
import "./Auth.css"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"

import { AuthTitle, AuthBox, AuthBox2 } from "./AuthCommon"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(username, password)
    onLogin(username, password)
  }

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    switch (name) {
      case "username":
        return setUsername(value)
      case "password":
        return setPassword(value)
      default:
    }
  }

  return (
    <div className="AuthBigBox position-absolute top-50 start-50 translate-middle">
      <form className="auth-form" onSubmit={onSubmit}>
        <article className="card-body">
          <AuthTitle title={"로그인"} />
          {/* <AuthBox
            label={"id"}
            text={"아이디"}
            warning={"아이디를 입력해주세요"}
            icon={faUser}
            value={username}
            name="username"
            onChange={onChange}
            placeholder={"아이디"}
          /> */}
          <input
            name="username"
            type="text"
            id={"id"}
            className="form-control"
            placeholder="아이디"
            onChange={onChange}
            value={username}
            required
          />
          <input
            name="password"
            type="password"
            id={"pw"}
            className="form-control"
            placeholder="비밀번호"
            onChange={onChange}
            value={password}
            required
          />
          {/* <AuthBox2
            label={"pw"}
            text={"비밀번호"}
            warning={"비밀번호를 입력해주세요"}
            icon={faLock}
            value={password}
            name="password"
            onChange={onChange}
            placeholder={"비밀번호"}
          /> */}
          <button
            type="submit"
            className="btn btn-primary mt-3 mb-3"
            style={{ width: "310px" }}
          >
            로그인
          </button>
          <div>
            <a>아이디 찾기</a>&nbsp;&#124;&nbsp;
            <a>비밀번호 찾기</a>&nbsp;&#124;&nbsp;
            <a href="/register">회원가입</a>
          </div>
        </article>
      </form>
    </div>
  )
}

export default Login
