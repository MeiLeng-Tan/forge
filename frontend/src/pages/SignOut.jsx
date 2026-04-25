import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, Button } from "@mui/material";

export default function SignOut() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/signout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch {
      // sign out locally regardless
    } finally {
      logout();
      navigate("/signin");
    }
  };
  handleSignOut();

  // return (
  //   <Box
  //     sx={{
  //       minHeight: "100vh",
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       bgcolor: "background.default",
  //     }}
  //   >
  //     <Box textAlign="center">
  //       <Typography variant="h5" fontWeight={600} color="grey.900" mb={1}>
  //         Welcome, {user?.firstName}
  //       </Typography>
  //       <Typography variant="body2" color="text.secondary" mb={3}>
  //         You&apos;re signed in to Forge.
  //       </Typography>
  //       <Button variant="contained" color="primary" onClick={handleSignOut}>
  //         Sign out
  //       </Button>
  //     </Box>
  //   </Box>
  // );
}
