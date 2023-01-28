import React, { useReducer } from 'react'

const INITIAL_STATE = {
  loggedIn: false
}

type State = {
    loggedIn: boolean
}

type Action = {
    loggedIn: boolean
}

const AuthContext = React.createContext({
  auth: INITIAL_STATE,
  setAuth: (() => (INITIAL_STATE)) as React.Dispatch<Action>
})

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [auth, setAuth] = useReducer((state: State, action: Action) => ({
    ...state,
    ...action
  }), INITIAL_STATE)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
