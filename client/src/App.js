import { useState, useEffect, createContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
import Routes from './Routes'

export const UserContext = createContext({})

function App() {
  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState(true)

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/isAuth')
        if (!res.ok) return setLoading(false)

        setUserSession(await res.json())
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUserAuth()
  }, [])

  return (
    <UserContext.Provider value={userSession}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? <>loading...</> : <Routes />}
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
