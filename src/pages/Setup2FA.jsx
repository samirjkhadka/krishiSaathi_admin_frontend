import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function Setup2FA() {
  const [qrUrl, setQrUrl] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_Id");

        const res = await axios.post(
          "https://krishisaathi-admin-api.onrender.com/api/v1/auth/2fa/setup",
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { otpauthUrl } = res.data.data;

        // Convert otpauth URL to QR code using Google Chart API
        // const qr = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(
        //   otpauthUrl
        // )}`;
        setQrUrl(otpauthUrl);
      } catch (err) {
        setError("Failed to load 2FA setup.", err);
      }
    };

    fetchQr();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setVerifying(true);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_Id");
      await axios.post(
        "https://krishisaathi-admin-api.onrender.com/api/v1/auth/2fa/verify",
        {
          userId: userId,
          token: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Setup 2FA
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {qrUrl ? (
          <>
            <Box display="flex" justifyContent="center" mt={2} mb={2}>
              <QRCodeCanvas value={qrUrl} size={200} />
            </Box>

            <Typography variant="body2" align="center" gutterBottom>
              Scan the QR code with Google Authenticator and enter the OTP
              below.
            </Typography>

            <form onSubmit={handleVerify}>
              <TextField
                fullWidth
                label="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                margin="normal"
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={verifying}
              >
                {verifying ? <CircularProgress size={24} /> : "Verify OTP"}
              </Button>
            </form>
          </>
        ) : (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
