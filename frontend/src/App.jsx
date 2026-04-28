import { Routes, Route, Navigate } from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import TaskPage from "./pages/TaskPage";

const theme = createTheme({
  palette: {
    primary: {
      main: '#111827',
      light: '#374151',
      dark: '#030712',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
  },
})

import CreateTaskDialog from "./components/TaskModal"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:id" element={<TaskPage />} />
          {/* <Route path="/" /> */}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}



export default App
