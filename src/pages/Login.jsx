import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
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
      const res = await axios.post(
        "https://krishisaathi-admin-api.onrender.com/api/v1/auth/login",
        formData
      );
      const { data } = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("user_Id", data.user.id);

      if (data.user.is_2fa_enabled) {
        navigate("/dashboard");
      } else {
        navigate("/setup-2fa");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <form
    //     action=""
    //     onSubmit={handleSubmit}
    //     className="bg-white p-8 rounded shadow-md w-full max-w-sm"
    //   >
    //     <img src="/krishiGyan.png" alt="" className="" />
    //     <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
    //     {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

    //     <div className="mb-4">
    //       <label htmlFor="" className="block text-sm mb-4">
    //         Username
    //       </label>
    //       <input
    //         type="text"
    //         name="username"
    //         value={formData.username}
    //         onChange={handleChange}
    //         className="mt-1 w-full border rounded px-3 py-2"
    //         required
    //       />
    //     </div>

    //     <div className="mb-6">
    //       <label htmlFor="" className="block text-gray-700">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         name="password"
    //         className="mt-1 w-full border rounded px-3 py-2"
    //         value={formData.password}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    //     >
    //       Login
    //     </button>

    //     <div className="text-sm text-center mt-4">
    //       <a href="/forgot-password" className="text-blue-500 hover:underline">
    //         Forgot Password?
    //       </a>
    //     </div>
    //   </form>
    // </div>

    <Container maxWidth="xs">
      <Paper elevetion={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography>Admin Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />

          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
