import { Routes, Route, Navigate } from "react-router-dom";
import {createTheme,ThemeProvider,CssBaseline,} from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import ProjectSpace from "./components/ProjectSpace";
import Dashboard from "./components/Dashboard";
import TaskPage from "./pages/TaskPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111827",

      light: "#374151",

      dark: "#030712",

      contrastText: "#ffffff",
    },

    background: {
      default: "#f9fafb",
    },
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: [
      "Inter",

      "-apple-system",

      "BlinkMacSystemFont",

      '"Segoe UI"',

      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <Routes>
          {/* DEFAULT */}
          <Route
            path="/"
            element={
              <Navigate
                to="/signin"
                replace
              />
            }
          />

          {/* AUTH */}
          <Route
            path="/signup"
            element={<SignUp />}
          />

          <Route
            path="/signin"
            element={<SignIn />}
          />

          <Route
            path="/signout"
            element={<SignOut />}
          />

          {/* DASHBOARD LAYOUT */}
          <Route
            path="/"
            element={<Dashboard />}
          >
            <Route
              path="/projects"
              element={<ProjectSpace />}
            />
          </Route>

          {/* TASK PAGE */}
          <Route
            path="/tasks/:projectId"
            element={<TaskPage />}
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;