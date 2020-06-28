import React, { createContext, useMemo } from 'react'
import { UserInterface } from 'types/users'

interface AuthType {
  user: UserInterface | null;
  authenticating: boolean;
}

const AuthContext = createContext<AuthType>({
  user: null,
  authenticating: true
})
export default AuthContext

type Props = {
  user: UserInterface
  authenticating: boolean
  children: React.ReactNode
}

export const AuthProvider = ({ user, authenticating, children }: Props) => {
  const value = useMemo(() => ({
    user,
    authenticating
  }), [user, authenticating])

  return (
    <AuthContext.Provider value={value}>
        {!authenticating && children}
    </AuthContext.Provider>
  )
}
