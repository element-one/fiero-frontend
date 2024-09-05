import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { checkAuth } from '@services/api'

export interface AuthContextProps {
  isAuthenticated: boolean
  isLoading: boolean
  setAuthenticated: (isAuthenticated: boolean) => void
}

const defaultContext: AuthContextProps = {
  isAuthenticated: false,
  isLoading: false,
  setAuthenticated: () => null,
}

export const AuthContext = createContext<AuthContextProps>(defaultContext)

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultContext.isAuthenticated
  )
  const [isLoading, setLoading] = React.useState(defaultContext.isLoading)

  const setAuthenticated = useCallback(
    (isAuthenticated: boolean) => setIsAuthenticated(isAuthenticated),
    [setIsAuthenticated]
  )

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true)
        const response = await checkAuth()
        setAuthenticated(response.status === 200)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setAuthenticated(false)
      }
    }
    initializeAuth()
  }, []) // eslint-disable-line

  return (
    <AuthContext.Provider
      value={{
        ...defaultContext,
        isLoading,
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
