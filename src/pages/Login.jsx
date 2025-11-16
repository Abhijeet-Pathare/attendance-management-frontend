import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/Api";
import authApi from "../api/authApi";
import { mockLogin } from "../api/mockAuth"; // <-- import mock login
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await authApi.post("/login", { username, password });

    // Backend returns only token string
    const token = res.data; 

    // Save token in localStorage and AuthContext
    login({ username }, token); // We can store username manually if you want

    navigate("/home");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  }
};
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center">Login</Typography>
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;