import React, { useState } from 'react'
import { IUser } from '~/models/user'

const AuthContext = React.createContext(
  {} as {
    user: IUser | null | undefined
    updateUser: (user: IUser) => void
  },
)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null | undefined>(null)
  const updateUser = (user: IUser) => {
    setUser(user)
  }
  return <AuthContext.Provider value={{ user, updateUser }}>{children}</AuthContext.Provider>
}

export default AuthProvider
