import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"

import Login from "../components/Auth/Login"
import SignUp from '../components/Auth/SignUp'

const AuthContext = createContext({})

const contextRef = createRef()

export function AuthProvider({ authService, authErrorEventBus, children }) {
  const [user, setUser] = useState(undefined)

  useImperativeHandle(contextRef, () => (user ? user.token : undefined))

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err)
      setUser(undefined)
    })
  }, [authErrorEventBus])

  useEffect(() => {
    authService.me().then(setUser).catch(console.error)
  }, [authService])

  const signUp = useCallback(
    async (name, id, pwd, email) =>
      authService
        .signup(name, id, pwd, email)
        .then((user) => setUser(user)),
    [authService]
  )

  const logIn = useCallback(
    async (username, password) =>
      authService.login(username, password).then((user) => setUser(user)),
    [authService]
  )

  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService]
  )

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout]
  )

  return (
    <AuthContext.Provider value={context}>
      {user ? (
        children
      ) : (
        <div className="app">
          <Login onLogin={logIn} onSignUp={signUp}/>
          {/* <SignUp  /> */}
        </div>
      )}

      {/* <div className="app">
          <Login onLogin={logIn} />
          <SignUp onSignUp={signUp} />
        </div> */}
    </AuthContext.Provider>
  )
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback
  }
  notify(error) {
    this.callback(error)
  }
}

export default AuthContext
export const fetchToken = () => contextRef.current
export const useAuth = () => useContext(AuthContext)
