import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import ProjectSpace from "./components/ProjectSpace";
import Dashboard from "./components/Dashboard";
import { theme } from "./styles/theme";
import TaskPage from "./pages/TaskPage";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#111827",
//       light: "#374151",
//       dark: "#030712",
//       contrastText: "#ffffff",
//     },
//     background: {
//       default: "#f9fafb",
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   typography: {
//     fontFamily: [
//       "Inter",
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "sans-serif",
//     ].join(","),
//   },
// });

import CreateTaskDialog from "./components/TaskModal";
import ProjectDetailsCard from "./components/ProjectDetailsCard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="/projects" element={<ProjectSpace />} />
            {/* <Route path="/tasks" element={<Task />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Route>
          <Route path="/project/:id" element={<TaskPage />} />
          {/* <Route path="/" /> */}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}





export default App;
