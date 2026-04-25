import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
} from "@mui/material";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/signin`,
        formData,
      );
      login(data.token, data.user);
      // navigate('/dashboard')
      //Navigate to workspace after signed in
      navigate("/workspace");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 448,
          p: 4,
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="grey.900" mb={0.5}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign in to your Forge account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ada@example.com"
            variant="outlined"
            size="small"
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            variant="outlined"
            size="small"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 0.5, py: 1 }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={2.5}
        >
          Don&apos;t have an account?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            color="grey.900"
            fontWeight={500}
            underline="hover"
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
